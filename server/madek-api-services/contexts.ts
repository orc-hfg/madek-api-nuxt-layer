import type { H3Event } from 'h3';
import { twentyFourHoursCache } from '../constants/cache';

export async function getContexts(event: H3Event): Promise<Contexts> {
	const { fetchFromApi } = createMadekApiClient<MadekContextsResponse>(event);
	const serverLogger = createServerLogger(event, 'Service: getContexts');

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
		return handleServiceError(serverLogger, error, 'Failed to fetch contexts.');
	}
}

export async function getContextById(event: H3Event, id: string): Promise<Context> {
	const { fetchFromApi } = createMadekApiClient<Context>(event);
	const serverLogger = createServerLogger(event, 'Service: getContextById');

	serverLogger.info('Context ID:', id);

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
		return handleServiceError(serverLogger, error, 'Failed to fetch context by ID.');
	}
}
