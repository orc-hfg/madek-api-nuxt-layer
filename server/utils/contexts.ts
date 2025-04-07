import type { H3Event } from 'h3';
import type { Context, Contexts, MadekContextsResponse } from '../../shared/types/api/contexts';
import { StatusCodes } from 'http-status-codes';
import { defaultCache } from '../constants/cache';
import { createMadekApiClient } from './madek-api';

export async function getContexts(event: H3Event): Promise<Contexts> {
	const { fetchFromApi } = createMadekApiClient<MadekContextsResponse>(event);

	try {
		const response = await fetchFromApi('/contexts', {
			apiOptions: {
				needsAuth: false,
			},
			publicDataCache: defaultCache,
		});

		return response.map((item: MadekContextsResponse[number]) => ({
			id: item.id,
			labels: item.labels,
		}));
	}
	catch {
		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: 'Failed to fetch contexts.',
		});
	}
}

export async function getContextById(event: H3Event, id: string): Promise<Context> {
	const { fetchFromApi } = createMadekApiClient<Context>(event);

	try {
		const response = await fetchFromApi(`/contexts/${id}`, {
			apiOptions: {
				needsAuth: false,
			},
			publicDataCache: defaultCache,
		});

		return {
			id: response.id,
			labels: response.labels,
		};
	}
	catch {
		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: 'Failed to fetch context by ID.',
		});
	}
}
