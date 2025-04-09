import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import typescriptParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import vueParser from 'vue-eslint-parser'

export default [
  // Basic JS configuration
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  // Vue configuration
  {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: typescriptParser,
      },
    },
    rules: {
      ...pluginVue.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': 'error',
    },
  },
  // TypeScript configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': 'error',
    },
  },
  // Global ignore patterns
  {
    ignores: ['dist/**', 'node_modules/**', '*.d.ts'],
  },
  // Global rules
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'prettier/prettier': 'error',
    },
  },
]
