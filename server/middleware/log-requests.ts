export default defineEventHandler((event) => {
	if (import.meta.dev) {
		console.info(`[DEV] ${getRequestURL(event)}`);
	}
});
