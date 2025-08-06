import { StatusCodes } from 'http-status-codes';
import { isDevelopmentEnvironment } from '../../shared/utils/environment';
import { createServerStartupLogger } from '../utils/server-logger';

export default defineNitroPlugin(() => {
	const config = useRuntimeConfig();
	const serverStartupLogger = createServerStartupLogger('Plugin: madek-api-initialization');

	serverStartupLogger.info('Madek API Base URL:', config.public.madekApi.baseURL);

	const isMainApplicationActive = Boolean(config.mainApplication);

	if (isDevelopmentEnvironment && isMainApplicationActive && !config.madekApi.token) {
		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: 'Missing Madek API token in runtimeConfig! Please check your environment variables in the main app.',
		});
	}
});
