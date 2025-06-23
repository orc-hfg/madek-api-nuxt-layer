import type { H3Event } from 'h3';
import type { Collections, CollectionsUserQuery, MadekCollectionsResponse } from '../types/collections';
import { StatusCodes } from 'http-status-codes';
import { noCache } from '../constants/cache';
import { createLogger } from '../utils/logger';
import { createMadekApiClient } from '../utils/madek-api';

export async function getCollections(event: H3Event, query: CollectionsUserQuery): Promise<Collections> {
	const runtimeConfig = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekCollectionsResponse>(event);
	const logger = createLogger(event);

	logger.info('getCollections', 'API baseURL:', runtimeConfig.public.madekApi.baseURL);
	logger.info('getCollections', 'Query params:', query);

	try {
		const response = await fetchFromApi('collections', {
			apiOptions: {
				needsAuth: false,
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
		const errorMessage = 'Failed to fetch collections.';

		logger.error('getCollections', errorMessage, error);

		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: errorMessage,
		});
	}
}
