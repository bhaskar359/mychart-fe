// postcss.config.cjs

module.exports = {
  plugins: {
    // CHANGE IS HERE: Use the new dedicated package
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
