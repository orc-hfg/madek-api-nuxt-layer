import type { H3Event } from 'h3';
import type { Context, Contexts, MadekContextsResponse } from '../types/contexts';
import { twentyFourHoursCache } from '../constants/cache';
import { createServerLogger } from '../utils/server-logger';

export async function getContexts(event: H3Event): Promise<Contexts> {
	const config = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekContextsResponse>(event);
	const serverLogger = createServerLogger(event);

	serverLogger.info('Service: getContexts', 'API baseURL:', config.public.madekApi.baseURL);

	try {
		const response = await fetchFromApi('contexts', {
			apiOptions: {
				isAuthenticationNeeded: false,
			},
			publicDataCache: twentyFourHoursCache,
		});

		return response.map((item: MadekContextsResponse[number]) => {
			return {
				id: item.id,
				labels: item.labels,
			};
		});
	}
	catch (error) {
		return handleServiceError(error, 'getContexts', serverLogger, 'Failed to fetch contexts.');
	}
}

export async function getContextById(event: H3Event, id: string): Promise<Context> {
	const config = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<Context>(event);
	const serverLogger = createServerLogger(event);

	serverLogger.info('Service: getContextById', 'API baseURL:', config.public.madekApi.baseURL);
	serverLogger.info('Service: getContextById', 'Context ID:', id);

	try {
		const response = await fetchFromApi(`contexts/${id}`, {
			apiOptions: {
				isAuthenticationNeeded: false,
			},
			publicDataCache: twentyFourHoursCache,
		});

		return {
			id: response.id,
			labels: response.labels,
		};
	}
	catch (error) {
		return handleServiceError(error, 'getContextById', serverLogger, 'Failed to fetch context by ID.');
	}
}
