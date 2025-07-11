import type { FetchContext } from 'ofetch';
import type { Logger } from '../../shared/utils/logger';
import { createLogger } from '../../shared/utils/logger';

export function forwardCookieHeaders(
	context: FetchContext,
	options: {
		getRequestHeaders?: typeof useRequestHeaders;
		isServerEnvironment?: boolean;
		logger?: Logger;
	} = {},
): boolean {
	const {
		getRequestHeaders = useRequestHeaders,
		isServerEnvironment = import.meta.server,
		logger = createLogger(),
	} = options;

	if (!isServerEnvironment) {
		return false;
	}

	const { cookie } = getRequestHeaders(['cookie']);

	if (cookie !== undefined) {
		const headers = new Headers(context.options.headers);
		headers.set('cookie', cookie);

		context.options.headers = headers;

		logger.info('Utility: request-helpers', 'Cookie header forwarded.');

		return true;
	}

	logger.info('Utility: request-helpers', 'No cookie header found to forward.');

	return false;
}
