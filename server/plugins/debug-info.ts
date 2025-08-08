export default defineNitroPlugin(() => {
	const config = useRuntimeConfig();
	const publicConfig = config.public;
	const isDebugLoggingEnabled = publicConfig.enableDebugLogging;

	const serverStartupLogger = createServerStartupLogger('Plugin: debug-info');

	if (isDebugLoggingEnabled) {
		serverStartupLogger.info('Debug logging is enabled.');
	}
});
