import type { H3Event } from 'h3';
import type { Collections, MadekCollectionsResponse } from '../../shared/types/api/collections';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { useMadekApi } from '../../app/composables/use-madek-api';
import { noCache } from '../../shared/constants/cache';

export async function getCollections(event: H3Event, userId?: string): Promise<Collections> {
	const { fetchFromApi } = useMadekApi<MadekCollectionsResponse>(event);

	try {
		const response = await fetchFromApi('/collections', {
			apiOptions: {
				needsAuth: false,
				query: userId !== undefined && userId !== '' ? { responsible_user_id: userId } : undefined,
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
