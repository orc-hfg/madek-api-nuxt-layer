import type { paths } from '../../generated/api/madek-api';

type MadekAdminPeopleGet = paths['/api-v2/admin/people/{id}']['get'];

export type MadekAdminPeopleGetPathParameters = MadekAdminPeopleGet['parameters']['path'];

export type MadekAdminPeopleGetResponse = MadekAdminPeopleGet['responses']['200']['content']['application/json'];

/*
 * Normalized admin person information retrieved from /admin/people/{id} endpoint.
 * Represents a single person object (not filtered at API level).
 *
 * Server-side normalization:
 * - Null values in name fields are converted to empty strings
 * - Whitespace is trimmed from name fields
 * - Both fields may be empty strings if source data contains no name information
 *
 * Note: While this type allows both fields to be empty strings, consuming code
 * should filter out persons where both first_name and last_name are empty to
 * maintain consistency with PersonInfo filtering behavior in collection metadata.
 * See app/services/set.ts getRolesBasedFieldData() for example implementation.
 */
export interface AdminPerson {
	first_name: string;
	last_name: string;
}
