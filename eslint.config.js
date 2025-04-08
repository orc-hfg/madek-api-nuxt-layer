// Further configuration examples can be found at the end of the file

import antfu from '@antfu/eslint-config';
import eslintPluginSonarJs from 'eslint-plugin-sonarjs';
import withNuxt from './.playground/.nuxt/eslint.config.mjs';

export default withNuxt(
	antfu(
		{
			ignores: ['generated/', 'documentation/'],
			typescript: {
				// Enables type-aware linting
				tsconfigPath: 'tsconfig.json',
			},
			unicorn: {
				allRecommended: true,
			},
			stylistic: {
				indent: 'tab',
				semi: true,
			},
			...eslintPluginSonarJs.configs.recommended,
		},
		{
			files: ['**/*.ts', '**/*.vue'],
			rules: {
				'curly': 'error',
				'no-console': [
					'error',
					{
						allow: ['info', 'warn', 'error'],
					},
				],
				'no-implicit-coercion': 'error',
			},
		},
		{
			files: ['**/*.ts'],
			rules: {
				'ts/explicit-function-return-type': 'error',
				'camelcase': 'off',
				'ts/naming-convention': [
					'error',
					// 1) All types (classes, interfaces, enums, type aliases, etc.) => PascalCase
					{
						selector: 'typeLike',
						format: ['PascalCase'],
					},
					// 2) Interfaces must NOT start with 'I'
					{
						selector: 'interface',
						format: ['PascalCase'],
						custom: {
							regex: '^I[A-Z]',
							match: false,
						},
					},
					// 3) Boolean variables => camelCase with prefix (is/has/etc.)
					{
						selector: 'variable',
						types: ['boolean'],
						format: ['PascalCase'], // Note: As documented, the prefix is trimmed before format is validated, thus PascalCase must be used to allow variables such as isEnabled
						prefix: ['is', 'should', 'has', 'can', 'did', 'was', 'will'],
					},
					// 4) Destructured variables => camelCase
					{
						selector: 'variable',
						modifiers: ['destructured'],
						format: ['camelCase'],
					},
					// 5) This rule allows both camelCase and UPPER_CASE for const variables.
					// If the variable name strictly matches ^[A-Z0-9_]+$ (e.g. API_URL),
					// the rule enforces correct uppercase formatting. Otherwise, it accepts camelCase.
					{
						selector: 'variable',
						modifiers: ['const'],
						format: ['UPPER_CASE', 'camelCase'],
						filter: {
							regex: '^[A-Z0-9_]+$',
							match: true,
						},
					},
					// 6) Other variables => camelCase
					{
						selector: 'variable',
						format: ['camelCase'],
					},
					// 7) Parameters => camelCase with optional leading underscore
					{
						selector: 'parameter',
						format: ['camelCase'],
						leadingUnderscore: 'allow',
					},
					// 8) Functions => camelCase
					{
						selector: 'function',
						format: ['camelCase'],
					},
				],
				'ts/no-floating-promises': 'error',
				'no-magic-numbers': 'off',
				'ts/no-magic-numbers': [
					'error',
					{
						ignoreReadonlyClassProperties: true,
						ignore: [-1, 0, 1],
						ignoreArrayIndexes: true,
					},
				],
				'ts/no-misused-promises': 'error',
				'ts/promise-function-async': 'error',
				'ts/return-await': ['error', 'in-try-catch'],
			},
		},
		{
			// File naming conventions:
			// - Vue components (.vue): PascalCase (official Nuxt/Vue convention)
			// - Global default remains kebab-case (unicorn default setting)
			files: ['**/*.vue'],
			rules: {
				'unicorn/filename-case': [
					'error',
					{
						case: 'pascalCase',
					},
				],
			},
		},
		{
			// Composables naming convention:
			// - camelCase with 'use' prefix (Vue 3 Composition API standard)
			// - Example: useComposable.ts
			files: ['app/composables/**/*.ts'],
			rules: {
				'unicorn/filename-case': [
					'error',
					{
						case: 'camelCase',
					},
				],
			},
		},
		{
			files: ['**/*.test.ts'],
			rules: {
				'test/consistent-test-filename': 'error',
				'test/consistent-test-it': ['error', { fn: 'it' }],
				'test/expect-expect': 'error',
				'test/max-expects': 'error',
				'test/max-nested-describe': 'error',
				'test/no-alias-methods': 'error',
				'test/no-commented-out-tests': 'error',
				'test/no-conditional-expect': 'error',
				'test/no-conditional-in-test': 'error',
				'test/no-conditional-tests': 'error',
				'test/no-disabled-tests': 'warn',
				'test/no-done-callback': 'error',
				'test/no-duplicate-hooks': 'error',
				'test/no-focused-tests': 'error',
				'test/no-hooks': 'error',
				'test/no-identical-title': 'error',
				'test/no-import-node-test': 'error',
				'test/no-interpolation-in-snapshots': 'error',
				'test/no-large-snapshots': 'error',
				'test/no-mocks-import': 'error',
				'test/no-standalone-expect': 'error',
				'test/no-test-prefixes': 'error',
				'test/no-test-return-statement': 'error',
				'test/padding-around-after-all-blocks': 'error',
				'test/padding-around-after-each-blocks': 'error',
				'test/padding-around-all': 'error',
				'test/padding-around-before-all-blocks': 'error',
				'test/padding-around-before-each-blocks': 'error',
				'test/padding-around-describe-blocks': 'error',
				'test/padding-around-expect-groups': 'error',
				'test/prefer-called-with': 'error',
				'test/prefer-comparison-matcher': 'error',
				'test/prefer-each': 'error',
				'test/prefer-equality-matcher': 'error',
				'test/prefer-expect-resolves': 'error',
				'test/prefer-hooks-in-order': 'error',
				'test/prefer-hooks-on-top': 'error',
				'test/prefer-lowercase-title': 'error',
				'test/prefer-mock-promise-shorthand': 'error',
				'test/prefer-snapshot-hint': 'error',
				'test/prefer-spy-on': 'error',
				'test/prefer-strict-boolean-matchers': 'error',
				'test/prefer-strict-equal': 'error',
				'test/prefer-to-be': 'error',
				'test/prefer-to-be-object': 'error',
				'test/prefer-to-contain': 'error',
				'test/prefer-to-have-length': 'error',
				'test/prefer-todo': 'error',
				'test/prefer-vi-mocked': 'error',
				'test/require-hook': 'error',
				'test/require-local-test-context-for-concurrent-snapshots': 'error',
				'test/require-mock-type-parameters': 'error',
				'test/require-to-throw-message': 'error',
				'test/require-top-level-describe': ['error', { maxNumberOfTopLevelDescribes: 2 }],
				'test/valid-describe-callback': 'error',
				'test/valid-expect': 'error',
				'test/valid-title': 'error',
				'test/valid-expect-in-promise': 'error',
				'ts/naming-convention': 'off',
			},
		},
	),
);

/*
These plugins are used by antfu/eslintconfig:
https://github.com/antfu/eslint-config/tree/main/src/configs

Documentation:
https://github.com/antfu/eslint-config

Some of them are renamed to make the overall scope more consistent and easier to write:
https://github.com/antfu/eslint-config?tab=readme-ov-file#plugins-renaming

import/*
node/*
yaml/*
ts/*
style/*
test/*

*/

/*
Other example configurations:

Example project:
https://github.com/joejordan/vite-frontend-template/blob/master/eslint.config.mjs

export default await antfu(
  {
    unocss: false,
    vue: {
      overrides: {
        'vue/no-restricted-syntax': ['error', {
          selector: 'VElement[name=\'a\']',
          message: 'Use NuxtLink instead.',
        }],
      },
    },
    ignores: [
      'public/**',
      'public-dev/**',
      'public-staging/**',
      'https-dev-config/**',
      'elk-translation-status.json',
      'docs/translation-status.json',
    ],
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
  {
    files: ['locales/**.json'],
    rules: {
      'jsonc/sort-keys': 'error',
    },
  },
)
*/

/*
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    overrides: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
    },
  },
  yaml: {
    overrides: {},
  },
})
*/
