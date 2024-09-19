import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { caughtErrorsIgnorePattern: "^_$" }],
    },
  },
  {
    files: ["*.cjs"],
    languageOptions: {
      globals: {
        ...globals.node, // Apply Node.js globals only to .cjs files
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
