// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	future: {
		compatibilityVersion: 4,
	},
	devtools: { enabled: true },
	typescript: {
		typeCheck: true,
	},
	modules: ['@nuxt/eslint'],
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
