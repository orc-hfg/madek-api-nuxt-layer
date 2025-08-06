import type { Logger } from '../../shared/utils/logger';
import { createLoggerWithConfig } from '../../shared/utils/logger';

export function createAppLogger(source: string): Logger {
	const config = useRuntimeConfig();
	const isDebugLoggingEnabled = Boolean(config.public.enableDebugLogging);

	return createLoggerWithConfig('App', source, isDebugLoggingEnabled);
}
