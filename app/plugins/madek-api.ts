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
				const logger = createLogger();

				if (import.meta.server) {
					const { cookie } = useRequestHeaders(['cookie']);

					if (cookie !== undefined) {
						const headers = new Headers(context.options.headers);
						headers.set('cookie', cookie);

						context.options.headers = headers;

						logger.debug('Plugin: madek-api', 'Cookie header forwarded', cookie);
					}
				}
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
