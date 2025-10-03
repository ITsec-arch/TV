// postcss.config.mjs (ESM)
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // v4 adapter (required with Next 15/Turbopack)
    autoprefixer: {},
  },
};

