import { StatusCodes } from 'http-status-codes';

export default defineNitroPlugin(() => {
	const config = useRuntimeConfig();
	const logger = createLogger();

	logger.info('Plugin: madek-api-initialization', 'Madek API Base URL:', config.public.madekApi.baseURL);

	const isMainApplicationActive = Boolean(config.mainApplication);

	if (import.meta.dev && isMainApplicationActive && !config.madekApi.token) {
		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: 'Missing Madek API token in runtimeConfig! Please check your environment variables in the main app.',
		});
	}
});
