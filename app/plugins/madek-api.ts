import { createAppLogger } from '../utils/app-logger';

export default defineNuxtPlugin({
	name: 'madek-api',
	setup() {
		const config = useRuntimeConfig();
		const appLogger = createAppLogger();

		/*
		 * See:
		 * https://nuxt.com/docs/guide/recipes/custom-usefetch#custom-fetch
		 * https://github.com/nuxt/nuxt/issues/27996#issuecomment-2211864930
		 */
		const madekApi = $fetch.create({
			baseURL: `${config.app.baseURL}api`,

			onRequest(context) {
				forwardCookieHeaders(context, { logger: appLogger });
			},

			onResponseError(context) {
				appLogger.error('Plugin: madek-api', 'API request failed.', context.response);
			},
		});

		return {
			provide: {
				madekApi,
			},
		};
	},
});
