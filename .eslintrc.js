module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./packages/*/tsconfig.json", "./apps/*/tsconfig.json"],
    ecmaVersion: 2020,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "airbnb-typescript",
    "plugin:eslint-comments/recommended",
    "plugin:import/recommended",
    "plugin:node/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    quotes: "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "node/no-unsupported-features/es-syntax": [
      "error",
      { version: ">=16.15.0", ignores: ["modules"] },
    ],
    "node/no-missing-import": [
      "error",
      {
        allowModules: [],
        resolvePaths: ["./.yarn"],
        tryExtensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        ignoreIIFE: true,
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn", // or error
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-namespace": "off",
  },
  root: true,
  ignorePatterns: [".eslintrc.js", "next.config.js"],
};
