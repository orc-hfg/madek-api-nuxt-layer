import type { H3Event } from 'h3';

interface Logger {
	error: (source: string, message: string, error?: unknown) => void;
	info: (source: string, message: string, data?: unknown) => void;
}

export function createLogger(event: H3Event): Logger {
	const runtimeConfig = useRuntimeConfig(event);
	const isDebugLoggingEnabled = Boolean(runtimeConfig.enableDebugLogging);

	return {
		info(source: string, message: string, data?: unknown): void {
			if (isDebugLoggingEnabled) {
				console.info(`[${source}] ${message}`, data === undefined ? '' : data);
			}
		},

		error(source: string, message: string, error?: unknown): void {
			if (isDebugLoggingEnabled) {
				console.error(`[${source}] ${message}`);

				if (error !== undefined) {
					console.error(`[${source}] Error details:`, error);
				}
			}
		},
	};
}
