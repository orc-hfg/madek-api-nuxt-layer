import { createAppLogger } from '../utils/app-logger';
import { forwardCookieHeader } from '../utils/request-helpers';

export default defineNuxtPlugin({
	name: 'madek-api',
	setup() {
		const config = useRuntimeConfig();
		const appLogger = createAppLogger();
		const isServerEnvironment = import.meta.server;

		/*
		 * See:
		 * https://nuxt.com/docs/guide/recipes/custom-usefetch#custom-fetch
		 */
		const madekApi = $fetch.create({
			baseURL: `${config.app.baseURL}api`,

			onRequest(context) {
				/*
				 * See:
				 * https://nuxt.com/docs/4.x/api/composables/use-request-headers
				 * https://github.com/nuxt/nuxt/issues/27996#issuecomment-2211864930
				 */

				// Get request headers in the plugin context where it's safe to use Nuxt composables
				const cookieHeader = isServerEnvironment ? useRequestHeaders(['cookie']) : undefined;

				forwardCookieHeader(context, {
					logger: appLogger,
					cookieHeader,
				});
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
