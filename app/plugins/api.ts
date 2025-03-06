export default defineNuxtPlugin(() => {
	const api = $fetch.create({
		baseURL: '/api',
		async onResponseError({ response }) {
			console.error('Fetch response error:', response);
		},
	});

	return {
		provide: {
			api,
		},
	};
});
