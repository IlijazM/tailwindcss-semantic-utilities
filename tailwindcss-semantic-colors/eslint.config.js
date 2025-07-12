import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', 'example/**', 'node_modules/**'],
  },

  js.configs.recommended,

  {
    files: ['./src/**/*.ts'],
    ...tseslint.configs.recommendedTypeChecked[0],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
