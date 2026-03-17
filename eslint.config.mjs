import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettierPlugin from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{ts,js,tsx,jsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      "simple-import-sort": simpleImportSort,
      "prettier": prettierPlugin,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    rules: {
    "max-len": [2, 120],
    "@typescript-eslint/naming-convention": [1, {
      "selector": "variable",
      "format": ["camelCase", "UPPER_CASE", "PascalCase"],
      "leadingUnderscore": "allow"
    }],
    "@typescript-eslint/no-unused-vars": [2, {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    "import/no-extraneous-dependencies": 0,
    "import/no-anonymous-default-export": 0,
    "import/order": 0,
    "react/no-unescaped-entities": 0,
    "arrow-parens": 0,
    "no-plusplus": 0,
    "no-continue": 0,
    "arrow-body-style": 0,
    "object-curly-newline": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/no-unused-prop-types": 0,
    "unused-imports/no-unused-imports": 1,
    "react/react-in-jsx-scope": 0,
    "react/require-default-props": 0,
    "react/destructuring-assignment": 1,
    "react/no-array-index-key": 0,
    "react/no-danger": 1,
    "react/jsx-uses-react": 0,
    "react/jsx-no-undef": [2, { "allowGlobals": true }],
    "react/jsx-one-expression-per-line": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/no-static-element-interactions": 1,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "react/display-name": 0,
    "@typescript-eslint/no-shadow": 0,
    "react-hooks/exhaustive-deps": 0,
    "@typescript-eslint/no-explicit-any": 1,
    "indent": ["warn", 2, { "SwitchCase": 1 }],         
    "react/jsx-indent": ["warn", 2],                   
    "react/jsx-indent-props": ["warn", 2], 
    "prettier/prettier": ["error", {
    "singleQuote": false,
    "jsxSingleQuote": false,
    "objectCurlySpacing": true,
    }],            
    "react/jsx-newline": ["warn", { "prevent": true, "allowMultilines": true }],
    "padding-line-between-statements": [
    "warn",
    { blankLine: "always", prev: "*", next: "return" },
    { blankLine: "always", prev: "*", next: "if" },
    { blankLine: "any", prev: "if", next: "if" },
    { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
    { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
  ],
  "simple-import-sort/imports": [
    "warn",
    {
      "groups": [
        ["^react", "^@?\\w"],
        ["^@"],
        ["^\\."]
      ]
    }
  ]
  },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "next-env.d.ts",
    "*.config.mjs",
  ]),
]);