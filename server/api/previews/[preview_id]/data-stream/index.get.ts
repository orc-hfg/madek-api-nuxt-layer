import type { H3Event } from 'h3';
import { mockData } from '../../../../madek-api-mock/data';
import { getApiMockOrExecute } from '../../../../madek-api-services/mock-handler';
import { getPreviewDataStream } from '../../../../madek-api-services/preview-data-stream';
import { routeParameterSchemas } from '../../../../schemas/madek-api-route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.previewId);

	const pathParameters: MadekPreviewsDataStreamPathParameters = {
		preview_id: parameters.preview_id,
	};

	return getApiMockOrExecute(
		event,
		'API: preview data-stream',
		'Returning mock: preview data-stream',
		{ previewId: pathParameters.preview_id },
		() => mockData.getPreviewDataStream(pathParameters.preview_id),
		async () => getPreviewDataStream(event, pathParameters.preview_id),
	);
});
