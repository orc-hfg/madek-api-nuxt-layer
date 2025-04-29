import { createResolver } from '@nuxt/kit';
import packageJson from './package.json' with { type: 'json' };

function composeVersion(): string {
	return packageJson.version ? `v${packageJson.version}` : 'Unknown Version';
}

const resolver = createResolver(import.meta.url);

export default defineNuxtConfig({
	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: '2025-01-24',
	devtools: {
		enabled: true,
	},
	typescript: {
		typeCheck: true,
	},
	modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/test-utils/module'],
	pinia: {

		/*
		 * See:
		 * https://github.com/vuejs/pinia/discussions/2378#discussioncomment-8940427
		 * https://pinia.vuejs.org/ssr/nuxt.html#Auto-imports
		 */
		storesDirs: [resolver.resolve('./app/stores/**')],
	},
	eslint: {
		config: {

			/*
			 * Ensures the module only generates Nuxt-specific rules so that it can be merged with
			 * own config presets (@antfu/eslint-config)
			 */
			standalone: false,
		},
	},

	/*
	 * See:
	 * https://github.com/unjs/c12?tab=readme-ov-file#environment-specific-configuration
	 * https://nuxt.com/docs/getting-started/configuration#environment-overrides
	 */
	runtimeConfig: {
		app: {
			baseUrl: '',
		},
		madekApi: {
			baseUrl: '',
			token: '',
		},
		// It will only take effect in development mode, useful for testing.
		delayResponse: false,
		public: {
			version: composeVersion(),
			madekApi: {
				baseUrl: '',
			},
		},
	},
	$development: {
		runtimeConfig: {
			public: {
				madekApi: {
					baseUrl: 'https://dev.madek.hfg-karlsruhe.de/api-v2',
				},
			},
		},
	},
	$production: {
		runtimeConfig: {
			public: {
				madekApi: {
					baseUrl: 'https://madek.hfg-karlsruhe.de/api-v2',
				},
			},
		},
	},
	$env: {
		staging: {
			runtimeConfig: {
				public: {
					madekApi: {
						baseUrl: 'https://staging.madek.hfg-karlsruhe.de/api-v2',
					},
				},
			},
		},
	},
});
