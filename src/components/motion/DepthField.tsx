"use client";

import { useEffect, useRef } from "react";

/**
 * Volumetric depth field rendered with raw WebGL (no library). A slow, domain
 * warped noise in ink + deep red + a faint cool trough, focused toward the
 * upper-right where the spine sits, so the hero reads as looking into a 3D
 * space rather than a flat page.
 *
 * This component is purely additive decoration: it is dynamically imported with
 * ssr:false and only ever mounted by InstrumentField on desktop, with motion
 * allowed and WebGL present. If anything fails it renders an empty canvas and
 * the CSS depth layers carry the look. aria-hidden, pointer-events none.
 *
 * Perf budget: capped DPR, capped buffer size, ~30fps throttle, paused when
 * offscreen or the tab is hidden, cheap 5-octave fbm, full GL teardown.
 */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.0,0.0)), c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float asp = u_res.x / u_res.y;
  vec2 p = vec2(uv.x*asp, uv.y);
  float t = u_time*0.02;
  vec2 q = vec2(fbm(p*1.6 + vec2(0.0,t)), fbm(p*1.6 + vec2(3.2,-t)));
  float f = fbm(p*2.2 + q*1.4 + vec2(t*0.6, 0.0));
  vec2 c = vec2((uv.x-0.72)*asp, uv.y-0.78);
  float focus = smoothstep(0.95, 0.0, length(c));
  float d = pow(f, 1.6) * (0.3 + 0.7*focus);
  vec3 ink  = vec3(0.043,0.039,0.035);
  vec3 red  = vec3(0.62,0.12,0.11);
  vec3 cool = vec3(0.12,0.16,0.22);
  vec3 col = ink;
  col = mix(col, cool, smoothstep(0.2,0.0,f)*0.22*focus);
  col = mix(col, red, d*0.72);
  float vig = smoothstep(1.25, 0.2, length(uv-vec2(0.55,0.35)));
  col *= 0.52 + 0.48*vig;
  col *= 0.82;
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export default function DepthField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, powerPreference: "low-power" }) as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    let raf = 0;
    let running = false;
    let onScreen = false;
    const start = performance.now();
    let last = 0;
    const FRAME = 1000 / 30;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    function setup() {
      program = gl!.createProgram();
      if (!program) return false;
      const vs = compile(gl!.VERTEX_SHADER, VERT);
      const fs = compile(gl!.FRAGMENT_SHADER, FRAG);
      gl!.attachShader(program, vs);
      gl!.attachShader(program, fs);
      gl!.linkProgram(program);
      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) return false;
      gl!.useProgram(program);
      buffer = gl!.createBuffer();
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
      // one big triangle covering clip space
      gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl!.STATIC_DRAW);
      const loc = gl!.getAttribLocation(program, "a_pos");
      gl!.enableVertexAttribArray(loc);
      gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0);
      uRes = gl!.getUniformLocation(program, "u_res");
      uTime = gl!.getUniformLocation(program, "u_time");
      return true;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.min(Math.round(canvas!.clientWidth * dpr), 2000);
      const h = Math.min(Math.round(canvas!.clientHeight * dpr), 1400);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    function frame(now: number) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (now - last < FRAME) return;
      last = now;
      resize();
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, (now - start) / 1000);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    function play() {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }
    function pause() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = !!entries[0]?.isIntersecting;
        if (onScreen && !document.hidden) play();
        else pause();
      },
      { threshold: 0.01 }
    );
    const onVis = () => {
      if (document.hidden) pause();
      else if (onScreen) play();
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      pause();
    };
    const onRestored = () => {
      if (setup()) {
        resize();
        play();
      }
    };

    canvas.addEventListener("webglcontextlost", onLost as EventListener, false);
    canvas.addEventListener("webglcontextrestored", onRestored as EventListener, false);

    if (!setup()) return;
    resize();
    gl.clearColor(0.043, 0.039, 0.035, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    io.observe(canvas);
    document.addEventListener("visibilitychange", onVis);
    play();

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost as EventListener);
      canvas.removeEventListener("webglcontextrestored", onRestored as EventListener);
      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      const lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} style={{ display: "block", width: "100%", height: "100%" }} />;
}
