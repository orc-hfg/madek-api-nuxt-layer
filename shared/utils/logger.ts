import { createConsola } from 'consola';

export interface Logger {
	debug: (source: string, message: string, data?: unknown) => void;
	info: (source: string, message: string, data?: unknown) => void;
	warn: (source: string, message: string, data?: unknown) => void;
	error: (source: string, message: string, data?: unknown) => void;
}

type LoggerContext = 'Server' | 'App';

let hasLoggedStatus = false;

export function createLoggerWithConfig(context: LoggerContext, isDebugLoggingEnabled: boolean): Logger {
	if (!hasLoggedStatus) {
		const statusLogger = createConsola();
		statusLogger.info(`[Logger] Debug logging is ${isDebugLoggingEnabled ? 'enabled' : 'disabled'}.`);

		hasLoggedStatus = true;
	}

	// See: https://github.com/unjs/consola?tab=readme-ov-file#log-level
	const LOG_LEVEL_DEFAULT = 4;
	const LOG_LEVEL_SILENT = -999;

	const logger = createConsola({
		level: isDebugLoggingEnabled ? LOG_LEVEL_DEFAULT : LOG_LEVEL_SILENT,
	});

	function log(level: 'debug' | 'info' | 'warn' | 'error', source: string, message: string, data?: unknown): void {
		if (data === undefined) {
			logger[level](`[${context}] [${source}] ${message}`);
		}
		else {
			logger[level](`[${context}] [${source}] ${message}`, data);
		}
	};

	return {
		debug: (source: string, message: string, data?: unknown): void => { log('debug', source, message, data); },
		info: (source: string, message: string, data?: unknown): void => { log('info', source, message, data); },
		warn: (source: string, message: string, data?: unknown): void => { log('warn', source, message, data); },
		error: (source: string, message: string, data?: unknown): void => { log('error', source, message, data); },
	};
}
