import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'dist',
      'out',
      'build',
      'node_modules',
      'coverage',
      '.pnpm-store/**',
      '.pnpm-techmarque-reel/**',
      'work/**',
      'TECHMARQUE_REMOTION_FINAL_V1/**',
      'techmarque-motion-system/**',
      'techmarque-reel-da-busca-ao-orcamento-final/**',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        URL: 'readonly',
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
);
