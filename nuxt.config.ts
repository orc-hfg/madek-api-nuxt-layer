import { createResolver } from '@nuxt/kit';

const resolver = createResolver(import.meta.url);

export default defineNuxtConfig({
	future: {
		compatibilityVersion: 4,
	},
	devtools: { enabled: true },
	typescript: {
		typeCheck: true,
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
	runtimeConfig: {
		madekApi: {
			baseUrl: 'https://dev.madek.hfg-karlsruhe.de/api-v2',
			token: '',
		},
		delayResponse: false, // It will only take effect in deveplopment mode, useful for testing.
	},
	$production: {
		runtimeConfig: {
			madekApi: {
				baseUrl: 'https://madek.hfg-karlsruhe.de/api-v2',
			},
		},
	},
	compatibilityDate: '2025-01-24',
});
