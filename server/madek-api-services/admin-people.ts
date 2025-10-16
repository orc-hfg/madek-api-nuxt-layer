import type { H3Event } from 'h3';
import { twentyFourHoursCache } from '../constants/cache';

/*
 * Fetch admin person data from /admin/people/{id} endpoint
 *
 * Returns undefined on 404 instead of throwing error because this service is used
 * to fetch referenced data (e.g., persons in role assignments). Missing persons
 * can occur when a person is deleted but role references still exist. The app
 * layer handles this gracefully by filtering out roles with missing persons.
 *
 * This differs from other API services that fetch primary resources (collections,
 * meta keys, etc.) where 404 errors are legitimate failures.
 */
export async function getAdminPerson(event: H3Event, id: MadekAdminPeopleGetPathParameters['id']): Promise<AdminPerson | undefined> {
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
		/*
		 * Handle 404 gracefully: Person may have been deleted while role references
		 * still exist. Return undefined to allow app layer to filter out affected roles.
		 */
		if (isH3NotFoundError(error)) {
			serverLogger.warn(`Person ${id} not found (404), returning undefined.`);

			return undefined;
		}

		/*
		 * Other errors (500, network failures, etc.) are thrown as H3Error
		 * since they indicate actual service failures, not missing data.
		 */
		return handleServiceError(serverLogger, error, 'Failed to fetch admin person.');
	}
}
