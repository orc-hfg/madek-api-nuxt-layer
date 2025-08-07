export default defineNitroPlugin(() => {
	const config = useRuntimeConfig();
	const publicConfig = config.public;
	const isDebugLoggingEnabled = publicConfig.enableDebugLogging;

	if (isDebugLoggingEnabled) {
		const serverStartupLogger = createServerStartupLogger('Plugin: debug-info');

		serverStartupLogger.info('Debug logging is enabled.');
	}
});
