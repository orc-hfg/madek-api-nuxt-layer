import type { FetchContext } from 'ofetch';
import { createAppLogger } from './app-logger';

interface CookieHeader {
	cookie?: string;
}

interface ForwardCookieHeaderOptions {
	cookieHeader?: CookieHeader;
	isServerEnvironment?: boolean;
	logger?: Logger;
}

const LOGGER_SOURCE = 'Utility: request-helpers';

export function forwardCookieHeader(
	context: FetchContext,
	{
		cookieHeader,
		isServerEnvironment = import.meta.server,
		logger = createAppLogger(),
	}: ForwardCookieHeaderOptions = {},
): void {
	if (!isServerEnvironment) {
		return;
	}

	const cookieValue = cookieHeader?.cookie?.trim();

	if (cookieValue === undefined || cookieValue === '') {
		logger.info(LOGGER_SOURCE, 'No cookie header found to forward.');

		return;
	}

	const requestHeaders = new Headers(context.options.headers);
	requestHeaders.set('cookie', cookieValue);
	context.options.headers = requestHeaders;

	logger.info(LOGGER_SOURCE, 'Cookie header forwarded.');
}
