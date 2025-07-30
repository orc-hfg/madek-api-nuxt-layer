import { createLoggerWithConfig, type Logger } from '../../shared/utils/logger';

export function createAppLogger(): Logger {
	const config = useRuntimeConfig();
	const isDebugLoggingEnabled = Boolean(config.public.enableDebugLogging);

	return createLoggerWithConfig('App', isDebugLoggingEnabled);
}
