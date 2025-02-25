// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	future: {
		compatibilityVersion: 4,
	},
	devtools: { enabled: true },
	typescript: {
		typeCheck: true,
	},
	runtimeConfig: {
		madekApi: {
			baseUrl: 'https://dev.madek.hfg-karlsruhe.de/api-v2',
			token: '',
		},
		delayResponse: true, // It will only take effect in deveplopment mode, useful for testing.
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
