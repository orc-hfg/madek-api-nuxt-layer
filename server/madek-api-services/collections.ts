import type { H3Event } from 'h3';
import type { Collections, CollectionsUserQuery, MadekCollectionsResponse } from '../types/collections';
import { fiveMinutesCache } from '../constants/cache';
import { createServerLogger } from '../utils/server-logger';

export async function getCollections(event: H3Event, query: CollectionsUserQuery): Promise<Collections> {
	const { fetchFromApi } = createMadekApiClient<MadekCollectionsResponse>(event);
	const serverLogger = createServerLogger(event, 'Service: getCollections');

	serverLogger.info('Query params:', { responsible_user_id: query.responsible_user_id, filter_by: query.filter_by });

	try {
		const response = await fetchFromApi('collections', {
			apiOptions: {
				isAuthenticationNeeded: false,
				query,
			},
			publicDataCache: fiveMinutesCache,
		});

		return response.collections.map((item) => {
			return {
				id: item.id,
			};
		});
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch collections.');
	}
}
