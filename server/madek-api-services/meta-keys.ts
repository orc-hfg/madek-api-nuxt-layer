import type { H3Event } from 'h3';
import { noCache } from '../constants/cache';

export async function getMetaKeyLabels(event: H3Event, id: MadekMetaKeysGetPathParameters['id']): Promise<MetaKeyLabels> {
	const { fetchFromApi } = createMadekApiClient<MadekMetaKeysGetResponse>(event);
	const serverLogger = createServerLogger(event, 'API Service: getMetaKeyLabels');

	serverLogger.info('MetaKey ID:', id);

	try {
		const response = await fetchFromApi(`meta-keys/${id}`, {
			apiOptions: {
				isAuthenticationNeeded: false,
			},
			publicDataCache: noCache,
		});

		return {
			labels: {
				de: normalizeTextContent(response.labels.de, true),
				en: normalizeTextContent(response.labels.en, true),
			},
		};
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch meta key.');
	}
}
