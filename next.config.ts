import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy route retired; threat intelligence now lives under research.
      { source: "/intelligence", destination: "/research", permanent: true },
    ];
  },
};

export default nextConfig;
