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
 */
export interface AdminPerson {
	first_name: string;
	last_name: string;
}
