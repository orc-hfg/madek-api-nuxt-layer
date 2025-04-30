import type { H3Event } from 'h3';
import type { Collections, CollectionsUserQuery, MadekCollectionsResponse } from '../../shared/types/api/collections';
import { StatusCodes } from 'http-status-codes';
import { noCache } from '../constants/cache';
import { createDebugLogger } from './debug-logger';
import { createMadekApiClient } from './madek-api';

export async function getCollections(event: H3Event, query: CollectionsUserQuery): Promise<Collections> {
	const runtimeConfig = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekCollectionsResponse>(event);
	const logger = createDebugLogger(event);

	logger.info('getCollections', 'API baseURL:', runtimeConfig.public.madekApi.baseURL);
	logger.info('getCollections', 'Query params:', query);

	try {
		const response = await fetchFromApi('/collections', {
			apiOptions: {
				needsAuth: false,
				query,
			},
			publicDataCache: noCache,
		});

		return response.collections.map(item => ({
			id: item.id,
		}));
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
