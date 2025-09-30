module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals", "prettier"],
  parserOptions: {
    project: './tsconfig.eslint.json'
  },
  rules: {
    "@next/next/no-img-element": "off",
    "react/no-danger": "off"
  }
};
