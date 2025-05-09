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
	experimental: {

		/*
		 * Restore the old caching behaviour (before Nuxt 3.17) and wait for implementation of first-party caching strategies
		 * See: https://github.com/nuxt/nuxt/issues/31949#issuecomment-2844391646
		 */
		purgeCachedData: false,
		granularCachedData: false,
	},
	compatibilityDate: '2025-05-09',
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
		// This will only take effect in development mode, useful for testing.
		delayResponse: false,
		// Enable detailed API debug logging
		enableDebugLogging: false,
		app: {
			// Will be set via environment variables
			baseURL: '/',
		},
		madekApi: {
			// Will be set via environment variables
			token: '',
		},
		public: {
			version: composeVersion(),
			madekApi: {
				// Will be set via runtimeConfig
				baseURL: '',
			},
		},
	},
	$development: {
		runtimeConfig: {
			public: {
				madekApi: {
					baseURL: 'https://dev.madek.hfg-karlsruhe.de/api-v2/',
				},
			},
		},
	},
	$production: {
		runtimeConfig: {
			public: {
				madekApi: {
					baseURL: 'https://dev.madek.hfg-karlsruhe.de/api-v2/',
				},
			},
		},
	},
	$env: {
		staging: {
			runtimeConfig: {
				public: {
					madekApi: {
						baseURL: 'https://staging.madek.hfg-karlsruhe.de/api-v2/',
					},
				},
			},
		},
	},
});
