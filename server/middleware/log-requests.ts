if (import.meta.dev) {
	const runtimeConfig = useRuntimeConfig();
	console.info(`[MIDDLEWARE DEV] Madek API Base URL: ${runtimeConfig.public.madekApi.baseURL}`);
}

export default defineEventHandler((event) => {
	if (import.meta.dev) {
		console.info(`[MIDDLEWARE DEV] Request URL: ${getRequestURL(event)}`);
	}
});
