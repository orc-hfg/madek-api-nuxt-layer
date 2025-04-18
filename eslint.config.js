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
			files: ['**/*.ts'],
			rules: {
				'no-console': [
					'error',
					{
						allow: ['info', 'warn', 'error'],
					},
				],
				'no-implicit-coercion': 'error',
				'for-direction': 'error',
				'no-constant-binary-expression': 'error',
				'no-constant-condition': 'error',
				'no-dupe-else-if': 'error',
				'no-empty-static-block': 'error',
				'no-nonoctal-decimal-escape': 'error',
				'no-unsafe-optional-chaining': 'error',
				'no-useless-escape': 'error',
				'require-yield': 'error',
				'import/no-deprecated': 'error',
				'import/no-import-module-exports': 'error',
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
				'ts/adjacent-overload-signatures': 'error',
				'ts/array-type': 'error',
				'ts/ban-tslint-comment': 'error',
				'ts/class-literal-property-style': 'error',
				'ts/consistent-generic-constructors': 'error',
				'ts/consistent-indexed-object-style': 'error',
				'ts/consistent-type-assertions': 'error',
				'ts/no-array-delete': 'error',
				'ts/no-base-to-string': 'error',
				'ts/no-confusing-non-null-assertion': 'error',
				'ts/no-confusing-void-expression': 'error',
				'ts/no-deprecated': 'error',
				'ts/no-duplicate-type-constituents': 'error',
				'ts/no-empty-function': 'error',
				'ts/no-inferrable-types': 'error',
				'ts/no-loop-func': 'error',
				'ts/no-meaningless-void-operator': 'error',
				'ts/no-misused-spread': 'error',
				'ts/no-mixed-enums': 'error',
				'ts/no-redundant-type-constituents': 'error',
				'ts/no-unnecessary-boolean-literal-compare': 'error',
				'ts/no-unnecessary-condition': 'error',
				'ts/no-unnecessary-template-expression': 'error',
				'ts/no-unnecessary-type-arguments': 'error',
				'ts/no-unnecessary-type-parameters': 'error',
				'ts/no-unsafe-enum-comparison': 'error',
				'ts/no-unsafe-unary-minus': 'error',
				'ts/non-nullable-type-assertion-style': 'error',
				'ts/only-throw-error': 'error',
				'ts/prefer-find': 'error',
				'ts/prefer-for-of': 'error',
				'ts/prefer-function-type': 'error',
				'ts/prefer-includes': 'error',
				'ts/prefer-nullish-coalescing': 'error',
				'ts/prefer-optional-chain': 'error',
				'ts/prefer-promise-reject-errors': 'error',
				'ts/prefer-reduce-type-parameter': 'error',
				'ts/prefer-regexp-exec': 'error',
				'ts/prefer-return-this-type': 'error',
				'ts/prefer-string-starts-ends-with': 'error',
				'ts/related-getter-setter-pairs': 'error',
				'ts/require-await': 'error',
				'ts/use-unknown-in-catch-callback-variable': 'error',
				'style/array-bracket-newline': 'error',
				'style/curly-newline': 'error',
				'style/function-call-spacing': 'error',
				'style/implicit-arrow-linebreak': 'error',
				'style/line-comment-position': 'error',
				'style/linebreak-style': 'error',
				'style/lines-around-comment': 'error',
				'style/multiline-comment-style': 'error',
				'style/newline-per-chained-call': 'error',
				'style/no-confusing-arrow': 'error',
				'style/object-curly-newline': 'error',
				'style/one-var-declaration-per-line': 'error',
				'style/padding-line-between-statements': [
					'error',
					{ blankLine: 'always', prev: '*', next: ['enum', 'interface', 'type', 'return'] },
				],
				'style/semi-style': 'error',
				'style/switch-colon-spacing': 'error',
				'style/wrap-regex': 'error',
				'perfectionist/sort-variable-declarations': 'error',
				'perfectionist/sort-intersection-types': 'error',
				'perfectionist/sort-heritage-clauses': 'error',
				'perfectionist/sort-array-includes': 'error',
				'perfectionist/sort-object-types': 'error',
				'perfectionist/sort-switch-case': 'error',
				'perfectionist/sort-decorators': 'error',
				'perfectionist/sort-interfaces': 'error',
				'perfectionist/sort-enums': 'error',
				'perfectionist/sort-sets': 'error',
				'perfectionist/sort-maps': 'error',
			},
		},
		{
			files: ['**/*.vue'],
			rules: {
				'vue/no-constant-condition': 'error',
			},
		},
		{
			// File naming conventions:
			// - Vue components (.vue): PascalCase (official Nuxt/Vue convention)
			// - Global default remains kebab-case (unicorn default setting)
			files: ['app/components/**/*.vue'],
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
				'test/no-duplicate-hooks': 'error',
				'test/no-focused-tests': 'error',
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
				'test/padding-around-test-blocks': 'error',
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
				'test/require-local-test-context-for-concurrent-snapshots': 'error',
				'test/require-to-throw-message': 'error',
				'test/require-top-level-describe': ['error', { maxNumberOfTopLevelDescribes: 2 }],
				'test/valid-describe-callback': 'error',
				'test/valid-expect': 'error',
				'test/valid-title': 'error',
				'test/valid-expect-in-promise': 'error',
				'ts/naming-convention': 'off',
				'ts/explicit-function-return-type': 'off',
				'sonarjs/no-nested-functions': 'off',
			},
		},
		{
			files: ['**/*.md', '**/*.mdown'],
			rules: {
				'markdown/fenced-code-language': 'error',
				'markdown/no-empty-links': 'error',
				'markdown/no-invalid-label-refs': 'error',
				'markdown/no-missing-label-refs': 'error',
				'markdown/heading-increment': 'error',
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
