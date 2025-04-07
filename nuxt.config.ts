import { createResolver } from '@nuxt/kit';
import packageJson from './package.json' with { type: 'json' };

function composeVersion(): string {
	return packageJson.version ? `v${packageJson.version}` : 'Unknown Version';
}

const resolver = createResolver(import.meta.url);

export default defineNuxtConfig({
	experimental: {
		// See: https://youtu.be/XnWXWye8sBM?si=HJYjOualqx1vpF7I&t=3300
		typedPages: true,
	},
	future: {
		compatibilityVersion: 4,
	},
	devtools: {
		enabled: true,
	},
	typescript: {
		typeCheck: true,
	},
	debug: {
		templates: true,
		modules: true,
		watchers: true,
		hooks: {
			client: true,
			server: true,
		},
		nitro: true,
		router: true,
		hydration: true,
	},
	modules: ['@nuxt/eslint', '@pinia/nuxt'],
	pinia: {
		// See:
		// https://github.com/vuejs/pinia/discussions/2378#discussioncomment-8940427
		// https://pinia.vuejs.org/ssr/nuxt.html#Auto-imports
		storesDirs: [resolver.resolve('./app/stores/**')],
	},
	eslint: {
		config: {
			standalone: false, // Ensures the module only generates Nuxt-specific rules so that it can be merged with own config presets (@antfu/eslint-config)
		},
	},
	// See:
	// https://github.com/unjs/c12?tab=readme-ov-file#environment-specific-configuration
	// https://nuxt.com/docs/getting-started/configuration#environment-overrides
	runtimeConfig: {
		madekApi: {
			baseUrl: '',
			token: '',
		},
		delayResponse: false, // It will only take effect in development mode, useful for testing.
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
	compatibilityDate: '2025-01-24',
});
