import { createLogger } from '../../shared/utils/logger';

export default defineEventHandler((event) => {
	const logger = createLogger(event);

	logger.debug('Middleware: log-requests', 'Headers:', {
		event,
		headers: event.node.req.headers,
		host: event.node.req.headers.host,
		forwardedHost: event.node.req.headers['x-forwarded-host'],
	});

	logger.info('Middleware: log-requests', 'Request URL:', getRequestURL(event).href);
});
