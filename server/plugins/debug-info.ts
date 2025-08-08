import { logDebugInfo } from '../../shared/utils/debug-info';
import { createServerStartupLogger } from '../utils/server-logger';

export default defineNitroPlugin(() => {
	const config = useRuntimeConfig();
	const publicConfig = config.public;
	const isDebugLoggingEnabled = publicConfig.enableDebugLogging;

	if (!isDebugLoggingEnabled) {
		return;
	}

	const serverStartupLogger = createServerStartupLogger('Plugin: debug-info');
	logDebugInfo(serverStartupLogger, publicConfig);
});
