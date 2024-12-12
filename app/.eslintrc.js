module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true // Node.js 環境を有効にする
  },
  extends: ['next/core-web-vitals',"eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  }
};
