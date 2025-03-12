export default defineNuxtPlugin({
	name: 'placeholder-api',
	setup() {
		const placeholderApi = $fetch.create({
			baseURL: 'https://jsonplaceholder.typicode.com/',
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
