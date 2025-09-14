export default defineNitroPlugin(() => {
	const config = useRuntimeConfig();
	const publicConfig = config.public;
	const { apiBaseName } = publicConfig;
	const isApiMockEnabled = publicConfig.enableApiMock;

	if (!isApiMockEnabled) {
		return;
	}

	const serverStartupLogger = createServerStartupLogger('Plugin: mock-routes');

	registerMockRoute(`/${apiBaseName}/collections`, () => {
		serverStartupLogger.info('Mock: collections');

		return mockData.collections();
	});

	registerMockRoute(`/${apiBaseName}/collection/:collectionId/media-entry-arcs`, (parameters) => {
		validateParameters(serverStartupLogger, parameters, 'collectionId');

		const { collectionId } = parameters;
		serverStartupLogger.info('Mock: collection media-entry-arcs', { collectionId });

		return mockData.mediaEntryArcs(collectionId!);
	});

	registerMockRoute(`/${apiBaseName}/collection/:collectionId/meta-datum/:metaKeyId`, (parameters) => {
		validateParameters(serverStartupLogger, parameters, 'collectionId', 'metaKeyId');

		const { collectionId, metaKeyId } = parameters;
		serverStartupLogger.info('Mock: collection meta-datum', { collectionId, metaKeyId });

		return mockData.metaDatum(collectionId!, metaKeyId!);
	});

	registerMockRoute(`/${apiBaseName}/media-entry/:mediaEntryId/preview`, (parameters) => {
		validateParameters(serverStartupLogger, parameters, 'mediaEntryId');

		const { mediaEntryId } = parameters;
		serverStartupLogger.info('Mock: media-entry preview', { mediaEntryId });

		return mockData.mediaEntryPreviews(mediaEntryId!);
	});

	registerMockRoute(`/${apiBaseName}/previews/:previewId/data-stream`, (parameters) => {
		validateParameters(serverStartupLogger, parameters, 'previewId');

		const { previewId } = parameters;
		serverStartupLogger.info('Mock: preview data stream', { previewId });

		return mockData.previews(previewId!);
	});

	serverStartupLogger.info('Mock routes registered:', getRegisteredMockPatterns());
});
