import type { H3Event } from 'h3';
import { getPreviewDataStream } from '../../../../madek-api-services/preview-data-stream';
import { routeParameterSchemas } from '../../../../schemas/route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.previewId);

	const pathParameters: MadekPreviewsDataStreamPathParameters = {
		preview_id: parameters.preview_id,
	};

	return getPreviewDataStream(
		event,
		pathParameters.preview_id,
	);
});
