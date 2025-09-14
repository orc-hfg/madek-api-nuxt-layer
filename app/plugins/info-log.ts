import type { PublicRuntimeConfig } from 'nuxt/schema';

function logInfo(logger: Logger, publicConfig: PublicRuntimeConfig): void {
	logger.info('=== ENVIRONMENT ===');
	logger.info(`Nuxt environment: ${isDevelopmentEnvironment ? 'development' : 'production'}`);

	logger.info('=== API ===');
	logger.info(`Base URL: ${publicConfig.madekApi.baseURL}`);

	const features = [
		{ name: 'Logging', isEnabled: publicConfig.enableLogging },
		{ name: 'Response delay', isEnabled: publicConfig.enableResponseDelay },
		{ name: 'Server-side caching', isEnabled: publicConfig.enableServerSideCaching },
		{ name: 'API mock', isEnabled: publicConfig.enableApiMock },
	];

	logger.info('=== LAYER FEATURES ===');
	for (const { name, isEnabled } of features) {
		logger.info(`${name}: ${isEnabled ? 'enabled' : 'disabled'}`);
	}
}

export default defineNuxtPlugin({
	name: 'info-log',
	setup() {
		const config = useRuntimeConfig();
		const publicConfig = config.public;
		const isLoggingEnabled = publicConfig.enableLogging;

		if (!isLoggingEnabled) {
			return;
		}

		const appLogger = createAppLogger('Plugin: info-log');
		logInfo(appLogger, publicConfig);
	},
});
