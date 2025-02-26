// @ts-check
import antfu from '@antfu/eslint-config';
import withNuxt from './.playground/.nuxt/eslint.config.mjs';

export default withNuxt(
	antfu({
		ignores: ['generated/'],
		// TypeScript and Vue are autodetected, but explicitly enabled here
		vue: true,
		typescript: {
			// Enables type-aware linting
			tsconfigPath: 'tsconfig.json',
		},
		// ESlint stylistic does not work well with VSCode (auto fix does not work), therefore disabled
		// Prettier is used instead
		stylistic: false,
	}),
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
