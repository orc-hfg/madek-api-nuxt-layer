import type { paths } from '../../generated/api/madek-api';

type MadekAdminPeopleGet = paths['/api-v2/admin/people/{id}']['get'];

export type MadekAdminPeopleGetPathParameters = MadekAdminPeopleGet['parameters']['path'];

export type MadekAdminPeopleGetResponse = MadekAdminPeopleGet['responses']['200']['content']['application/json'];

/*
 * Normalized admin person information from /admin/people/{id} endpoint.
 *
 * Server-side normalization:
 * - Null values in name fields are converted to empty strings
 * - Whitespace is trimmed from name fields
 * - Both fields MAY be empty strings if source data contains no name information
 *
 * Note: The getAdminPerson service returns AdminPerson | undefined. When the
 * person does not exist (404), undefined is returned instead of throwing an error.
 * This allows graceful handling when fetching referenced persons (e.g., in roles)
 * where the person may have been deleted but references still exist.
 */
export interface AdminPerson {
	readonly first_name: string;
	readonly last_name: string;
}
