import type { paths } from '../../generated/api/madek-api';

type MadekAdminPeopleGet = paths['/api-v2/admin/people/{id}']['get'];

export type MadekAdminPeopleGetPathParameters = MadekAdminPeopleGet['parameters']['path'];

export type MadekAdminPeopleGetResponse = MadekAdminPeopleGet['responses']['200']['content']['application/json'];

/**
 * Normalized admin person with guaranteed non-null string values.
 *
 * This type represents the data AFTER server-side normalization:
 * - null values are converted to empty strings
 * - Whitespace is trimmed for name fields
 */
export interface AdminPerson {
	first_name: string;
	last_name: string;
}
