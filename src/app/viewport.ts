import type { Viewport } from "next";

export const viewport: Viewport = {
  // Light/dark brand theme colors for the browser UI
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
  ],
};

export default viewport;

