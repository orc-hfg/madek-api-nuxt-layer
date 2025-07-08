import { StatusCodes } from 'http-status-codes';
import { createLogger } from '../utils/logger';

export default defineNitroPlugin(() => {
	const config = useRuntimeConfig();
	const logger = createLogger();

	logger.info('Plugin: madek-api-initialization', 'Madek API Base URL:', config.public.madekApi.baseURL);

	if (import.meta.dev && Boolean(config.isMainApp) && !config.madekApi.token) {
		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: 'Missing Madek API token in runtimeConfig! Please check your environment variables in the main app.',
		});
	}
});
