import type { H3Event } from 'h3';
import { noCache } from '../constants/cache';

export async function getCollections(event: H3Event, query: CollectionsQuery): Promise<Collections> {
	const { fetchFromApi } = createMadekApiClient<MadekCollectionsResponse>(event);
	const serverLogger = createServerLogger(event, 'API Service: getCollections');

	serverLogger.info('Query params:', { responsible_user_id: query.responsible_user_id, filter_by: query.filter_by });

	try {
		const response = await fetchFromApi('collections', {
			apiOptions: {
				isAuthenticationNeeded: false,
				query,
			},
			publicDataCache: noCache,
		});

		return response.collections.map((item) => {
			return {
				id: toCollectionId(item.id),
			};
		});
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch collections.');
	}
}
