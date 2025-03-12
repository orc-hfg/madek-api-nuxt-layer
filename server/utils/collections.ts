import type { H3Event } from 'h3';
import type { Collections, CollectionsUserQuery, MadekCollectionsResponse } from '../../shared/types/api/collections';
import { StatusCodes } from 'http-status-codes';
import { noCache } from '../../shared/constants/cache';
import { createMadekApiClient } from './madek-api';

export async function getCollections(event: H3Event, query: CollectionsUserQuery): Promise<Collections> {
	const { fetchFromApi } = createMadekApiClient<MadekCollectionsResponse>(event);

	try {
		const response = await fetchFromApi('/collections', {
			apiOptions: {
				needsAuth: false,
				query,
			},
			cache: noCache,
		});

		return response.collections.map(item => ({
			id: item.id,
		}));
	}
	catch {
		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: 'Failed to fetch collections.',
		});
	}
}
