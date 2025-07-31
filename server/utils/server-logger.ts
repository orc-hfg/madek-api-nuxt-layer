import type { H3Event } from 'h3';
import type { Logger } from '../../shared/utils/logger';
import { createLoggerWithConfig } from '../../shared/utils/logger';

export function createServerLogger(event: H3Event): Logger {
	const config = useRuntimeConfig(event);
	const isDebugLoggingEnabled = Boolean(config.public.enableDebugLogging);

	return createLoggerWithConfig('Server', isDebugLoggingEnabled);
}

/*
 * Creates a logger for server startup context (plugins, initialization).
 *
 * This is needed because server plugins run during server startup, not during
 * individual requests, so they don't have access to an H3Event. They need to
 * call useRuntimeConfig() without an event parameter.
 *
 * Use this in:
 * - Server plugins (server/plugins/*.ts)
 * - Server initialization code
 *
 * For request handlers, use createServerLogger(event) instead.
 */
export function createServerStartupLogger(): Logger {
	const config = useRuntimeConfig();
	const isDebugLoggingEnabled = Boolean(config.public.enableDebugLogging);

	return createLoggerWithConfig('Server', isDebugLoggingEnabled);
}
