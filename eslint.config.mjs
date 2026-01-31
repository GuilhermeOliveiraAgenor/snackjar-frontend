import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
 
  ...nextVitals,

 
  ...nextTs,

  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "no-duplicate-imports": "error",

      "react/jsx-key": "error",
      "react-hooks/exhaustive-deps": "warn",

      "eqeqeq": ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",

      "no-async-promise-executor": "error",
      "require-await": "warn",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "coverage/**",
    "next-env.d.ts",
    "src/components/ui/**",
  ]),
]);
