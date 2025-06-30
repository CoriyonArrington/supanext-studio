// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // FIX: Use the new package for Tailwind CSS as a PostCSS plugin
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;