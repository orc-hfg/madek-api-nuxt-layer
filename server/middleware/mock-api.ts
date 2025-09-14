import { Buffer } from 'node:buffer';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const publicConfig = config.public;
	const { apiBaseName } = publicConfig;
	const isApiMockEnabled = publicConfig.enableApiMock;

	if (!isApiMockEnabled) {
		return;
	}

	const { url } = event.node.req;
	if (!url?.startsWith(`/${apiBaseName}/`)) {
		return;
	}

	const serverLogger = createServerLogger(event, 'Middleware: mock-api');

	try {
		const mockResponse: MockResult = findAndExecuteMockUrl(url);

		if (mockResponse.found) {
			serverLogger.info(`Mock response for: ${url}`);

			const responseData = mockResponse.data;

			if (responseData instanceof Blob) {
				setResponseHeader(event, 'content-type', responseData.type);

				const arrayBuffer = await responseData.arrayBuffer();

				await send(event, Buffer.from(arrayBuffer));
			}
			else {
				setResponseHeader(event, 'content-type', 'application/json');

				await send(event, JSON.stringify(responseData));
			}
		}
	}
	catch (error) {
		serverLogger.error('Mock handler error:', error);
	}
});
