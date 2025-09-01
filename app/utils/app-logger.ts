export function createAppLogger(source: string): Logger {
	const config = useRuntimeConfig();
	const isLoggingEnabled = config.public.enableLogging;

	return createLoggerWithConfig('App', source, isLoggingEnabled);
}
