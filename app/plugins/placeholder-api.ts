import { createAppLogger } from '../utils/app-logger';

export default defineNuxtPlugin({
	name: 'placeholder-api',
	setup() {
		const placeholderApi = $fetch.create({
			baseURL: 'https://jsonplaceholder.typicode.com/',
			// eslint-disable-next-line ts/require-await
			async onResponseError({ response }) {
				const appLogger = createAppLogger();

				appLogger.error('Plugin: placeholder-api', 'API request failed.', response);
			},
		});

		return {
			provide: {
				placeholderApi,
			},
		};
	},
});
