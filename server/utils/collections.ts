import type { H3Event } from 'h3';
import type { Collections, CollectionsQuery, MadekCollectionsResponse } from '../../shared/types/api/collections';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { useMadekApi } from '../../app/composables/use-madek-api';
import { noCache } from '../../shared/constants/cache';

export async function getCollections(event: H3Event, query: CollectionsQuery): Promise<Collections> {
	const { fetchFromApi } = useMadekApi<MadekCollectionsResponse>(event);

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
			statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
			message: 'Failed to fetch collections.',
		});
	}
}
