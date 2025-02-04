// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: "2025-01-24",
	devtools: { enabled: true },
	typescript: {
		typeCheck: true,
	},
	runtimeConfig: {
		apiBaseUrl: "https://jsonplaceholder.typicode.com/",
	},
});
