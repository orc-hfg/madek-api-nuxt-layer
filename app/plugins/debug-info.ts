import { logDebugInfo } from '../../shared/utils/debug-info';
import { isClientEnvironment } from '../../shared/utils/environment';
import { createAppLogger } from '../utils/app-logger';

export default defineNuxtPlugin({
	name: 'debug-info',
	setup() {
		if (!isClientEnvironment) {
			return;
		}

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
