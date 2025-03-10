export default defineNuxtPlugin({
	name: 'madek-api',
	setup() {
		// See: https://nuxt.com/docs/guide/recipes/custom-usefetch#custom-fetch
		const madekApi = $fetch.create({
			baseURL: '/api',
			async onResponseError({ response }) {
				console.error('Fetch response error:', response);
			},
		});

		return {
			provide: {
				madekApi,
			},
		};
	},
});
