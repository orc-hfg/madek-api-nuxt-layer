export default defineEventHandler((event) => {
	const logger = createLogger();

	logger.info('Middleware: log-requests', 'Request URL:', getRequestURL(event).href);
});
