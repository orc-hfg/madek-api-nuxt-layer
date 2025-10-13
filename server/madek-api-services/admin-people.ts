import type { H3Event } from 'h3';
import { twentyFourHoursCache } from '../constants/cache';

export async function getAdminPerson(event: H3Event, id: MadekAdminPeopleGetPathParameters['id']): Promise<AdminPerson> {
	const { fetchFromApi } = createMadekApiClient<MadekAdminPeopleGetResponse>(event);
	const serverLogger = createServerLogger(event, 'API Service: getAdminPerson');

	serverLogger.info('Admin Person ID:', id);

	try {
		const response = await fetchFromApi(`admin/people/${id}`, {
			apiOptions: {
				isAuthenticationNeeded: false,
			},
			publicDataCache: twentyFourHoursCache,
		});

		return {
			first_name: normalizeTextContent(response.first_name, true),
			last_name: normalizeTextContent(response.last_name, true),
		};
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch admin person.');
	}
}
