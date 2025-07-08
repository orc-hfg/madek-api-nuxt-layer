import { createLogger } from '../../server/utils/logger';

export default defineNuxtPlugin({
	name: 'madek-api',
	setup() {
		// See: https://nuxt.com/docs/guide/recipes/custom-usefetch#custom-fetch
		const config = useRuntimeConfig();
		const madekApi = $fetch.create({
			baseURL: `${config.app.baseURL}api`,
			// eslint-disable-next-line ts/require-await
			async onResponseError({ response }) {
				const logger = createLogger();

				logger.error('Plugin: madek-api', 'API request failed.', response);
			},
		});

		return {
			provide: {
				madekApi,
			},
		};
	},
});
