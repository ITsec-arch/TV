import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * One Content-Security-Policy for the whole site. 'unsafe-inline' is required
 * for Next's inline bootstrap, the JSON-LD blocks and Framer Motion's inline
 * styles; a nonce-based policy would force every page to render dynamically and
 * lose the static output this site is built for. Development additionally needs
 * 'unsafe-eval' (React Refresh) and a websocket (HMR), and must not upgrade
 * insecure requests on http://localhost, so those differ by environment.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  `connect-src 'self'${isProd ? "" : " ws:"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // HSTS is only meaningful over TLS, so it is production-only.
  ...(isProd
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
    : []),
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Legacy route; threat intelligence is now a service line.
      { source: "/intelligence", destination: "/services/threat-intelligence", permanent: true },
    ];
  },
};

export default nextConfig;
