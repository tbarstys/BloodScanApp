module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals", "prettier"],
  plugins: ["testing-library"],
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "testing-library/no-unnecessary-act": "warn"
  }
};
