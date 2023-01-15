module.exports = {
  env: {
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "next",
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  rules: {
    "react/prop-types": "off",
  },
};
