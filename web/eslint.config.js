import { defineConfig, globalIgnores } from "eslint/config"
import importPlugin from "eslint-plugin-import"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import { parser, plugin } from "typescript-eslint"

export default defineConfig([
  globalIgnores(["dist/**"]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    plugins: { react, "react-hooks": reactHooks },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: { alwaysTryTypes: true, project: "./tsconfig.json" },
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "off",
      "react/no-unknown-property": "warn",
      "react/no-this-in-sfc": "warn",
      "react/jsx-no-duplicate-props": "error",
      "react/self-closing-comp": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",

      semi: ["error", "never"],
      eqeqeq: ["warn", "smart"],
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
      "no-dupe-args": "error",
      "no-dupe-class-members": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty-character-class": "warn",
      "no-empty-pattern": "warn",
      "no-extend-native": "warn",
      "no-extra-bind": "warn",
      "no-redeclare": "warn",
      "no-undef": "error",
      "no-unreachable": "warn",
      "no-unsafe-negation": "warn",
      "no-unused-expressions": ["warn", { allowShortCircuit: true, enforceForJSX: true }],
      "no-unused-labels": "warn",
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "none",
          ignoreRestSiblings: true,
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-with": "warn",
      "unicode-bom": ["warn", "never"],
      "use-isnan": "error",
      "valid-typeof": "error",

      "import/first": "warn",
      "import/default": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            { pattern: "react", group: "builtin", position: "before" },
            { pattern: "react-dom{,/**}", group: "builtin", position: "before" },
            { pattern: "@/**", group: "internal", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["react", "react-dom"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": plugin },
    languageOptions: { parser },
    rules: {
      "no-undef": "off",
      "no-dupe-class-members": "off",
      "no-redeclare": "off",
      "no-unused-vars": "off",
      "no-useless-constructor": "off",
      "@typescript-eslint/array-type": ["warn", { default: "array" }],
      "@typescript-eslint/consistent-type-assertions": [
        "warn",
        { assertionStyle: "as", objectLiteralTypeAssertions: "allow" },
      ],
      "@typescript-eslint/no-dupe-class-members": "error",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-extra-non-null-assertion": "warn",
      "@typescript-eslint/no-redeclare": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { vars: "all", args: "none", ignoreRestSiblings: true, caughtErrors: "all" },
      ],
      "@typescript-eslint/no-useless-constructor": "warn",
      "@typescript-eslint/no-wrapper-object-types": "warn",
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: { "import/order": "off" },
  },
])
