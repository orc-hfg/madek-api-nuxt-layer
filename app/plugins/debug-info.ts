import { isClientEnvironment } from '../../shared/utils/environment';
import { createAppLogger } from '../utils/app-logger';

export default defineNuxtPlugin({
	name: 'debug-info',
	setup() {
		const config = useRuntimeConfig();
		const publicConfig = config.public;
		const isDebugLoggingEnabled = publicConfig.enableDebugLogging;

		if (isDebugLoggingEnabled && isClientEnvironment) {
			const appLogger = createAppLogger('Plugin: debug-info');

			appLogger.info('Debug logging is enabled.');
		}
	},
});
