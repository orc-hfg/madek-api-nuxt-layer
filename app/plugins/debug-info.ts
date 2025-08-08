import { createAppLogger } from '../utils/app-logger';

interface DebugInfoLogger {
	info: (message: string) => void;
}

interface PublicRuntimeConfig {
	enableDebugLogging: boolean;
	enableResponseDelay: boolean;
	enableServerSideCaching: boolean;
}

function logDebugInfo(logger: DebugInfoLogger, publicConfig: PublicRuntimeConfig): void {
	logger.info('=== ENVIRONMENT ===');
	logger.info(`Nuxt environment: ${isDevelopmentEnvironment ? 'development' : 'production'}`);

	const features = [
		{ name: 'Debug logging', isEnabled: publicConfig.enableDebugLogging },
		{ name: 'Response delay', isEnabled: publicConfig.enableResponseDelay },
		{ name: 'Server-side caching', isEnabled: publicConfig.enableServerSideCaching },
	];

	logger.info('=== FEATURE FLAGS ===');
	for (const { name, isEnabled } of features) {
		logger.info(`${name}: ${isEnabled ? 'enabled' : 'disabled'}`);
	}
}

export default defineNuxtPlugin({
	name: 'debug-info',
	setup() {
		const config = useRuntimeConfig();
		const publicConfig = config.public;
		const isDebugLoggingEnabled = publicConfig.enableDebugLogging;

		if (!isDebugLoggingEnabled) {
			return;
		}

		const appLogger = createAppLogger('Plugin: debug-info');
		logDebugInfo(appLogger, publicConfig);
	},
});
