import { createLogger } from '../utils/logger';

export default defineEventHandler((event) => {
	const logger = createLogger(event);

	logger.info('Middleware: log-requests', 'Request URL:', getRequestURL(event).href);
});
