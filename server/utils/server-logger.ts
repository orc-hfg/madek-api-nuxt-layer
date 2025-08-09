import type { H3Event } from 'h3';

export function createServerLogger(event: H3Event, source: string): Logger {
	const config = useRuntimeConfig(event);
	const isDebugLoggingEnabled = config.public.enableDebugLogging;

	return createLoggerWithConfig('Server', source, isDebugLoggingEnabled);
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
export function createServerStartupLogger(source: string): Logger {
	const config = useRuntimeConfig();
	const isDebugLoggingEnabled = config.public.enableDebugLogging;

	return createLoggerWithConfig('Server', source, isDebugLoggingEnabled);
}
