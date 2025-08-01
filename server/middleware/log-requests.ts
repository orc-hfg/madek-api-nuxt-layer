import { createServerLogger } from '../utils/server-logger';

export default defineEventHandler((event) => {
	const serverLogger = createServerLogger(event);

	const { headers } = event.node.req;
	const forwardedHost = headers['x-forwarded-host'];
	const { host } = headers;

	/*
	 * When running behind a reverse proxy (like Nginx), external requests will include the x-forwarded-host header.
	 * However, Nuxt's internal server-to-server API calls (during SSR or data fetching) bypass the proxy and use localhost.
	 * This allows us to distinguish between external user requests and internal API calls in logs.
	 */
	const isInternalCall = forwardedHost === undefined && host === 'localhost';

	const requestURL = getRequestURL(event);
	serverLogger.info('Middleware: log-requests', 'Request URL:', isInternalCall ? `[Internal call] ${requestURL.href}` : requestURL.href);
});
