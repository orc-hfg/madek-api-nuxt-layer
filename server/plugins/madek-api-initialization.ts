import { StatusCodes } from 'http-status-codes';

export default defineNitroPlugin(() => {
	const config = useRuntimeConfig();

	const isMainApplicationActive = config.mainApplication === true;

	if (isDevelopmentEnvironment && isMainApplicationActive && !config.madekApi.token) {
		throw createError({
			statusCode: StatusCodes.SERVICE_UNAVAILABLE,
			statusMessage: 'Missing Madek API token in runtimeConfig! Please check your environment variables in the main app.',
		});
	}
});
