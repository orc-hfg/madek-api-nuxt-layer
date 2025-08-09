export function createAppLogger(source: string): Logger {
	const config = useRuntimeConfig();
	const isDebugLoggingEnabled = config.public.enableDebugLogging;

	return createLoggerWithConfig('App', source, isDebugLoggingEnabled);
}
