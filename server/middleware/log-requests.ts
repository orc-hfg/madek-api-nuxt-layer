import { createLogger } from '../../shared/utils/logger';

export default defineEventHandler((event) => {
	const logger = createLogger(event);
	const forwardedHost = event.node.req.headers['x-forwarded-host'];
	const { host } = event.node.req.headers;

	/*
	 * When running behind a reverse proxy (like Nginx), external requests will include the x-forwarded-host header.
	 * However, Nuxt's internal server-to-server API calls (during SSR or data fetching) bypass the proxy and use localhost.
	 * This allows us to distinguish between external user requests and internal API calls in logs.
	 */
	const isInternalCall = forwardedHost === undefined && host === 'localhost';

	logger.info('Middleware: log-requests', 'Request URL:', isInternalCall ? `[Internal API Call] ${getRequestURL(event).href}` : getRequestURL(event).href);
});
