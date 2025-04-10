export default defineNuxtPlugin({
	name: 'placeholder-api',
	setup() {
		const placeholderApi = $fetch.create({
			baseURL: 'https://jsonplaceholder.typicode.com/',
			// eslint-disable-next-line ts/require-await
			async onResponseError({ response }) {
				console.error('Fetch response error:', response);
			},
		});

		return {
			provide: {
				placeholderApi,
			},
		};
	},
});
