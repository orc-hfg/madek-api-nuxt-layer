import type { H3Event } from 'h3';
import { createServerLogger } from './server-logger';

function checkApiMockEnabledAndLog(event: H3Event,	loggerContext: string,	logMessage: string,	logData: Record<string, unknown> | undefined): boolean {
	const config = useRuntimeConfig(event);
	const isApiMockEnabled = config.public.enableApiMock;

	if (isApiMockEnabled) {
		const serverLogger = createServerLogger(event, loggerContext);
		serverLogger.info(logMessage, logData);
	}

	return isApiMockEnabled;
}

export async function getApiMockOrExecute<TResponse>(
	event: H3Event,
	loggerContext: string,
	logMessage: string,
	logData: Record<string, unknown> | undefined,
	mockDataFunction: () => TResponse | Promise<TResponse>,
	realApiFunction: () => TResponse | Promise<TResponse>,
): Promise<TResponse> {
	const isApiMockEnabled = checkApiMockEnabledAndLog(event, loggerContext, logMessage, logData);

	if (isApiMockEnabled) {
		return mockDataFunction();
	}

	return realApiFunction();
}
