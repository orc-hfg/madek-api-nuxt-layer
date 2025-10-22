import type { paths } from '../../generated/api/madek-api';
import type { LocalizedLabel } from './meta-keys';

type MadekCollectionMetaDatumGet = paths['/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}']['get'];

export type MadekCollectionMetaDatumPathParameters = MadekCollectionMetaDatumGet['parameters']['path'];

/*
 * Manual type definition for collection meta datum response.
 *
 * This interface is manually defined because the OpenAPI schema only provides
 * a generic 'unknown' type for this endpoint's response. This definition
 * is based on actual API responses and may need to be updated if the API changes.
 *
 * @see The original schema definition in '/generated/api/madek-api.d.ts' at
 * paths['/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}']['get']['responses']['200']['schema']
 * which is defined as 'unknown'.
 */

interface MadekMetaDatumPerson {
	meta_datum_id: string;
	person_id: string;
	created_by_id: string;
	meta_data_updated_at: string;
	id: string;
}

interface MadekPerson {
	institution: string | null;
	institutional_id: string | null;
	description: string | null;
	first_name: string | null;
	external_uris: string[];
	identification_info: string | null;
	searchable: string;
	updated_at: string;
	id: string;
	last_name: string | null;
	admin_comment: string | null;
	pseudonym: string | null;
	created_at: string;
	subtype: string | null;
}

interface MadekMetaDatumKeyword {
	id: string;
	created_by_id: string;
	meta_datum_id: string;
	keyword_id: string;
	created_at: string;
	updated_at: string;
	meta_data_updated_at: string;
}

interface MadekKeyword {
	description: string | null;
	external_uris: string[];
	meta_key_id: string;
	creator_id: string;
	term: string | null;
	updated_at: string;
	rdf_class: string;
	id: string;
	position: number;
	created_at: string;
}

interface MadekMetaDatumRole {
	id: string;
	meta_datum_id: string;
	person_id: string | null;
	role_id: string | null;
	position: number;
}

export interface MadekRole {
	id: string;
	labels: LocalizedLabel;
	meta_key_id: string;
	creator_id: string;
	created_at: string;
	updated_at: string;
}

export interface MadekCollectionMetaDatumResponse {
	'meta-data': {
		created_by_id: string;
		media_entry_id: string | null;
		collection_id: string;
		type: string;
		meta_key_id: string;
		string: string | null;
		id: string;
		meta_data_updated_at: string;
		json: Record<string, any> | null;
		other_media_entry_id: string | null;
	};
	'md_people'?: MadekMetaDatumPerson[];
	'people'?: (MadekPerson | null)[];
	'md_keywords'?: MadekMetaDatumKeyword[];
	'keywords'?: (MadekKeyword | null)[];
	'md_roles'?: MadekMetaDatumRole[];
	'roles'?: (MadekRole | null)[];
}

/*
 * Person information with normalized string fields.
 *
 * API service layer guarantees:
 * - Null entries are removed
 * - Name fields are normalized (trimmed)
 * - At least one name field (first_name OR last_name) is non-empty
 * - Individual fields may still be empty strings if only one name is present
 */
export interface PersonInfo {
	first_name: string;
	last_name: string;
}

/*
 * Keyword information with normalized term field.
 *
 * API service layer guarantees:
 * - Null entries are removed
 * - Term is normalized (trimmed)
 * - Term is always non-empty
 */
export interface KeywordInfo {
	term: string;
}

/*
 * Role information combining person-role associations with role definitions.
 *
 * API service layer guarantees:
 * - Null entries are removed
 * - person_id and role_id are non-null
 * - Roles without matching role definitions are excluded (referential integrity)
 * - Labels are normalized (may be null if not provided in source)
 *
 * Note: Person name validation happens in app service layer because
 * person data must be fetched separately via AdminPerson API.
 * See app/services/set.ts getRolesBasedFieldData() for filtering logic.
 */
export interface RoleInfo {
	person_id: string;
	role_id: string;
	labels: LocalizedLabel;
}

/*
 * Normalized collection meta datum response.
 *
 * API service layer guarantees:
 * - string field is never null (converted to empty string)
 * - Line endings normalized to \n for consistent hydration
 * - people: Only entries with at least one non-empty name (see PersonInfo)
 * - keywords: Only entries with non-empty terms (see KeywordInfo)
 * - roles: Valid structure, but person name validation happens in app layer (see RoleInfo)
 */
export interface CollectionMetaDatum {
	string: string;
	people?: PersonInfo[];
	keywords?: KeywordInfo[];
	roles?: RoleInfo[];
}

export type CollectionMetaData = CollectionMetaDatum[];
