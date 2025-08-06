import { createResolver } from '@nuxt/kit';
import packageJson from './package.json';

function composeVersion(): string {
	return packageJson.version ? `v${packageJson.version}` : 'Unknown Version';
}

const resolver = createResolver(import.meta.url);

export default defineNuxtConfig({
	compatibilityDate: '2025-07-31',
	devtools: {
		enabled: true,
	},
	typescript: {
		typeCheck: true,
	},
	modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/test-utils/module'],
	components: {
		// Do not auto-import components to support knip for unused imports
		dirs: [],
	},
	imports: {
		// Auto-import from repositories folder
		dirs: ['repositories'],
	},
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
		// This will only take effect in development mode, useful for testing
		enableResponseDelay: false,
		madekApi: {

			/*
			 * Set via environment variables (.env file)
			 * Token-based authentication is only used in development environment (localhost server)
			 * For production environments, API authentication is session-based
			 */
			token: '',
		},
		public: {
			enableDebugLogging: false,
			version: composeVersion(),
			madekApi: {
				baseURL: '',
			},
		},
	},
	$development: {
		runtimeConfig: {
			public: {
				enableDebugLogging: true,
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
