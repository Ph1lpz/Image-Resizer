import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        __dirname: "readonly",
      },
    },
  },

  // TypeScript configuration
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { 
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_'
          }
        ]
      }
  },

  // Test files configuration (Jasmine)
  {
    files: ["**/*.spec.ts", "**/*Spec.ts", "**/tests/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.jasmine,
        it: "readonly",
        expect: "readonly",
        describe: "readonly",
      },
    },
  },

  prettierConfig,

  {
    rules: {
      semi: ["error", "always"],
    },
  },

  // Ignore patterns
  {
    ignores: ["dist/", "node_modules/"],
  },
];
