module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "vue/no-use-v-if-with-v-for": "off",
    "unicorn/filename-case": "off",
    "unicorn/number-literal-case": "off",
    "number-literal-case/number-literal-case": "off",
  },
  extends: [
    "@nuxtjs",
    "prettier",
    "prettier/vue",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
    "plugin:number-literal-case/recommended",
  ],
  plugins: ["prettier", "number-literal-case"],
};
