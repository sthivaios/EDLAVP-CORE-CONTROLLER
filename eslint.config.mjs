// eslint.config.mjs
import { configs as tsConfigs } from 'typescript-eslint';
import js from '@eslint/js';
import globals from 'globals';
import parser from '@typescript-eslint/parser';

export default [
  // Base ESLint recommended config
  js.configs.recommended,

  // TypeScript plugin recommended config (no redefining, just merge)
  ...tsConfigs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Turn off ESLint’s built-in no-unused-vars
      'no-unused-vars': 'off',

      // Use TS-aware version instead
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
