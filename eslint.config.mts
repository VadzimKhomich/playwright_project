// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   {
//     files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
//     plugins: { js },
//     extends: ["js/recommended"],
//     languageOptions: { globals: globals.browser },
//   },
//   tseslint.configs.recommended,
//    {
//     // plugins: { prettier: prettierPlugin },
//     rules: {
//       "prettier/prettier": ["error", { endOfLine: "auto", printWidth: 120, singleQuote: false }],
//       eqeqeq: "error",
//     },
//   },
//   {
//     ignores: ["node_modules", "**/dist/**", "eslint.config.mts", "playwright-report", "test-results"],
//   },
// ]);

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.{js,mjs,cjs,ts}"],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto", printWidth: 120, singleQuote: false }],
      eqeqeq: "error",
    },
  },
  {
    ignores: ["node_modules", "**/dist/**", "eslint.config.mts", "playwright-report", "test-results"],
  },
];