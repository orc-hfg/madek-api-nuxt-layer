import type { H3Event } from 'h3';
import type { Collections, CollectionsUserQuery, MadekCollectionsResponse } from '../types/collections';
import { createServerLogger } from '../../server/utils/logger';
import { noCache } from '../constants/cache';

export async function getCollections(event: H3Event, query: CollectionsUserQuery): Promise<Collections> {
	const config = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekCollectionsResponse>(event);
	const serverLogger = createServerLogger(event);

	serverLogger.info('Service: getCollections', 'API baseURL:', config.public.madekApi.baseURL);
	serverLogger.info('Service: getCollections', 'Query params:', query);

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
				id: item.id,
			};
		});
	}
	catch (error) {
		return handleServiceError(error, 'getCollections', serverLogger, 'Failed to fetch collections.');
	}
}
