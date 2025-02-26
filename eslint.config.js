// @ts-check
import antfu from '@antfu/eslint-config';
import withNuxt from './.playground/.nuxt/eslint.config.mjs';

export default withNuxt(
	antfu(
		{
			ignores: ['generated/'],
			// TypeScript and Vue are autodetected, but explicitly enabled here
			vue: true,
			typescript: {
				// Enables type-aware linting
				tsconfigPath: 'tsconfig.json',
			},
			stylistic: {
				indent: 'tab',
				semi: true,
			},
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
				'require-await': 'error',
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
						format: ['camelCase'],
						prefix: ['is', 'should', 'has', 'can', 'did', 'was', 'will'],
					},
					// 4) Destructured variables => camelCase
					{
						selector: 'variable',
						modifiers: ['destructured'],
						format: ['camelCase'],
					},
					// 5) Real constant booleans/numbers => UPPER_CASE (strings not enforced)
					{
						selector: 'variable',
						modifiers: ['const'],
						types: ['boolean', 'number'],
						format: ['UPPER_CASE'],
					},
					// 6) Other variables => camelCase
					{
						selector: 'variable',
						format: ['camelCase'],
					},
					// 7) Parameters => camelCase
					{
						selector: 'parameter',
						format: ['camelCase'],
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
				'ts/return-await': 'error',
			},
		},
	),
);

// These plugins are used by antfu/eslintconfig:
// "@eslint-community/eslint-plugin-eslint-comments"
// "@eslint/markdown"
// "@stylistic/eslint-plugin"
// "@typescript-eslint/eslint-plugin"
// "@vitest/eslint-plugin"
// "eslint-plugin-antfu"
// "eslint-plugin-command"
// "eslint-plugin-import-x"
// "eslint-plugin-jsdoc"
// "eslint-plugin-jsonc"
// "eslint-plugin-n"
// "eslint-plugin-no-only-tests"
// "eslint-plugin-perfectionist"
// "eslint-plugin-regexp"
// "eslint-plugin-toml"
// "eslint-plugin-unicorn"
// "eslint-plugin-unused-imports"
// "eslint-plugin-vue"
// "eslint-plugin-yml"
// "eslint-processor-vue-blocks"

// Some of them are renamed to make the overall scope more consistent and easier to write:
// https://github.com/antfu/eslint-config?tab=readme-ov-file#plugins-renaming

// import/*
// node/*
// yaml/*
// ts/*
// style/*
// test/*

// Other example configurations:

/*
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
  // Sort local files
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
    overrides: {
      // ...
    },
  },
})
*/

// export default antfu({
//   ignores: [
//     '**/packages/**/',
//     'packages/',
//   ],
//   toml: false,
//   yaml: false,
//   ...pluginQuery.configs['flat/recommended'],
// }, {
//   files: ['**/*.vue'],
//   rules: {
//     'vue/max-attributes-per-line': ['error', {
//       singleline: {
//         max: 1,
//       },
//       multiline: {
//         max: 1,
//       },
//     }],
//   },
// })

// export default antfu(
//   {
//     // Configures for antfu's config
//   },

//   // From the second arguments they are ESLint Flat Configs
//   // you can have multiple configs
//   {
//     files: ['**/*.ts'],
//     rules: {},
//   },
//   {
//     rules: {},
//   },
// )
