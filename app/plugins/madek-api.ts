import { defineNuxtPlugin } from '#app';
import { createLogger } from '../../server/utils/logger';

export default defineNuxtPlugin({
	name: 'madek-api',
	setup() {
		const config = useRuntimeConfig();

		/*
		 * See:
		 * https://nuxt.com/docs/guide/recipes/custom-usefetch#custom-fetch
		 * https://github.com/nuxt/nuxt/issues/27996#issuecomment-2211864930
		 */
		const madekApi = $fetch.create({
			baseURL: `${config.app.baseURL}api`,

			onRequest(context) {
				if (import.meta.server) {
					const cookieHeaders = useRequestHeaders(['cookie']);

					if (typeof cookieHeaders.cookie === 'string' && cookieHeaders.cookie !== '') {
						context.options.headers.set('cookie', cookieHeaders.cookie);
					}
				}

				const logger = createLogger();

				logger.debug('Plugin: madek-api', 'API request started.', context.request);
				logger.debug('Plugin: madek-api options', 'API request started.', context.options);
				logger.debug('Plugin: madek-api error', 'API request started.', context.error);
			},

			onResponseError(context) {
				const logger = createLogger();

				logger.error('Plugin: madek-api', 'API request failed.', context.response);
			},
		});

		return {
			provide: {
				madekApi,
			},
		};
	},
});
