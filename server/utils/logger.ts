import type { H3Event } from 'h3';
import { createConsola } from 'consola';

export interface Logger {
	info: (source: string, message: string, data?: unknown) => void;
	warn: (source: string, message: string, data?: unknown) => void;
	error: (source: string, message: string, error?: unknown) => void;
}

export function createLogger(event?: H3Event): Logger {
	const config = useRuntimeConfig(event);
	const isDebugLoggingEnabled = Boolean(config.enableDebugLogging);

	// See: https://github.com/unjs/consola?tab=readme-ov-file#log-level
	const LOG_LEVEL_DEFAULT = 3;
	const LOG_LEVEL_SILENT = -999;

	const logger = createConsola({
		level: isDebugLoggingEnabled ? LOG_LEVEL_DEFAULT : LOG_LEVEL_SILENT,
	});

	return {
		info(source: string, message: string, data?: unknown): void {
			logger.info(`[${source}] ${message}`, data === undefined ? '' : data);
		},

		warn(source: string, message: string, data?: unknown): void {
			logger.warn(`[${source}] ${message}`, data === undefined ? '' : data);
		},

		error(source: string, message: string, error?: unknown): void {
			logger.error(`[${source}] ${message}`);

			if (error !== undefined) {
				logger.error(`[${source}] Error details:`, error);
			}
		},
	};
}
