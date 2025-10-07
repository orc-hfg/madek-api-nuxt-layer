import type { H3Event } from 'h3';
import { twentyFourHoursCache } from '../constants/cache';

export async function getMetaKeyLabels(event: H3Event, id: MadekMetaKeysGetPathParameters['id']): Promise<MetaKeyLabels> {
	const { fetchFromApi } = createMadekApiClient<MadekMetaKeysGetResponse>(event);
	const serverLogger = createServerLogger(event, 'Service: getMetaKeyLabels');

	serverLogger.info('MetaKey ID:', id);

	try {
		const response = await fetchFromApi(`meta-keys/${id}`, {
			apiOptions: {
				isAuthenticationNeeded: false,
			},
			publicDataCache: twentyFourHoursCache,
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
