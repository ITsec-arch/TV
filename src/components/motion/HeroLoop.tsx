"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  webm: string;
  mp4: string;
  poster: string;
  className?: string;
};

/**
 * Desktop-only, motion-only hero loop. Purely decorative (aria-hidden): the
 * real headline is live HTML beside it, and the attack-path SVG underneath is
 * the no-JS / reduced-motion / mobile fallback (the existing static hero).
 *
 * Correctness guarantees:
 * - Renders null on the server and on the first client render, so there is no
 *   hydration mismatch and no video on no-JS / reduced-motion / mobile.
 * - The poster paints immediately (poster attribute), so there is no layout
 *   shift and the poster, never the video, is the LCP candidate for this box.
 * - Sources are attached lazily (preload="none" + load() on intersection), so
 *   the video never blocks first paint or LCP.
 * - Playback pauses offscreen and when the tab is hidden (perf budget).
 */
export function HeroLoop({ webm, mp4, poster, className }: Props) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Decide eligibility after mount: desktop width and motion allowed.
  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(min-width: 768px)").matches) setShow(true);
  }, [reduce]);

  // Lazy-load then play/pause driven by viewport and tab visibility.
  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;
    let loaded = false;
    const onScreen = () => {
      const r = v.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          if (!loaded) { loaded = true; v.load(); }
          if (!document.hidden) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(v);
    const onVis = () => {
      if (document.hidden) v.pause();
      else if (onScreen()) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [show]);

  if (!show) return null;

  // Positioning lives here (absolute), framing lives on the parent panel, so no
  // position utility is overridden by a framing class.
  return (
    <video
      ref={videoRef}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={cn("absolute inset-0 block h-full w-full", className)}
      style={{ objectFit: "cover" }}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
