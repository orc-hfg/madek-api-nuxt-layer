import { StatusCodes, getReasonPhrase } from "http-status-codes";

export default defineNitroPlugin(() => {
	const runtimeConfig = useRuntimeConfig();

	if (import.meta.dev && runtimeConfig.isMainApp && !runtimeConfig.madekApi.token) {
		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
			message:
				"🔥 [DEV] Missing Madek API token in runtimeConfig! Please check your environment variables in the main app.",
		});
	}
});
