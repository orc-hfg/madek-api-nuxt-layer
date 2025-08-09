import type { FetchContext } from 'ofetch';
import { isServerEnvironment as defaultIsServerEnvironment } from '../../shared/utils/environment';

interface CookieHeader {
	cookie?: string;
}

interface ForwardCookieHeaderOptions {
	cookieHeader: CookieHeader;
	isServerEnvironment?: boolean;
	logger?: Logger;
}

export function forwardCookieHeader(
	context: FetchContext,
	{
		cookieHeader,
		isServerEnvironment = defaultIsServerEnvironment,
		logger = createAppLogger('Utility: request-helpers'),
	}: ForwardCookieHeaderOptions,
): void {
	if (!isServerEnvironment) {
		return;
	}

	const cookieValue = cookieHeader.cookie?.trim();

	if (cookieValue === undefined || cookieValue === '') {
		logger.info('No cookie header found to forward.');

		return;
	}

	const requestHeaders = new Headers(context.options.headers);
	requestHeaders.set('cookie', cookieValue);
	context.options.headers = requestHeaders;

	logger.info('Cookie header forwarded.');
}
