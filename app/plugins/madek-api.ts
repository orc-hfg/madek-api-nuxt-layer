export default defineNuxtPlugin({
	name: 'madek-api',
	setup() {
		const config = useRuntimeConfig();
		const appLogger = createAppLogger('Plugin: madek-api');
		const shouldForwardCookieHeader = isServerEnvironment && !isDevelopmentEnvironment;

		// Capture request headers during plugin setup where composables are available
		const cookieHeader = isServerEnvironment ? useRequestHeaders(['cookie']) : undefined;

		/*
		 * See:
		 * https://nuxt.com/docs/guide/recipes/custom-usefetch#custom-fetch
		 */
		const madekApi = $fetch.create({
			baseURL: `${config.app.baseURL}api`,

			onRequest(context) {
				if (shouldForwardCookieHeader && cookieHeader !== undefined) {
					forwardCookieHeader(context, {
						cookieHeader,
						logger: appLogger,
					});
				}
			},

			onResponseError(context) {
				appLogger.error('API request failed.', context.response);
			},
		});

		return {
			provide: {
				madekApi,
			},
		};
	},
});
