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
	readonly meta_datum_id: string;
	readonly person_id: string;
	readonly created_by_id: string;
	readonly meta_data_updated_at: string;
	readonly id: string;
}

interface MadekPerson {
	readonly institution: string | null;
	readonly institutional_id: string | null;
	readonly description: string | null;
	readonly first_name: string | null;
	readonly external_uris: string[];
	readonly identification_info: string | null;
	readonly searchable: string;
	readonly updated_at: string;
	readonly id: string;
	readonly last_name: string | null;
	readonly admin_comment: string | null;
	readonly pseudonym: string | null;
	readonly created_at: string;
	readonly subtype: string | null;
}

interface MadekMetaDatumKeyword {
	readonly id: string;
	readonly created_by_id: string;
	readonly meta_datum_id: string;
	readonly keyword_id: string;
	readonly created_at: string;
	readonly updated_at: string;
	readonly meta_data_updated_at: string;
}

interface MadekKeyword {
	readonly description: string | null;
	readonly external_uris: string[];
	readonly meta_key_id: string;
	readonly creator_id: string;
	readonly term: string | null;
	readonly updated_at: string;
	readonly rdf_class: string;
	readonly id: string;
	readonly position: number;
	readonly created_at: string;
}

interface MadekMetaDatumRole {
	readonly id: string;
	readonly meta_datum_id: string;
	readonly person_id: string | null;
	readonly role_id: string | null;
	readonly position: number;
}

export interface MadekRole {
	readonly id: string;
	readonly labels: LocalizedLabel;
	readonly meta_key_id: string;
	readonly creator_id: string;
	readonly created_at: string;
	readonly updated_at: string;
}

export interface MadekCollectionMetaDatumResponse {
	readonly 'meta-data': {
		readonly created_by_id: string;
		readonly media_entry_id: string | null;
		readonly collection_id: string;

		readonly type: string;
		readonly meta_key_id: string;
		readonly string: string | null;
		readonly id: string;
		readonly meta_data_updated_at: string;
		readonly json: Record<string, unknown> | null;
		readonly other_media_entry_id: string | null;
	};
	readonly 'md_people'?: MadekMetaDatumPerson[];
	readonly 'people'?: (MadekPerson | null)[];
	readonly 'md_keywords'?: MadekMetaDatumKeyword[];
	readonly 'keywords'?: (MadekKeyword | null)[];
	readonly 'md_roles'?: MadekMetaDatumRole[];
	readonly 'roles'?: (MadekRole | null)[];
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
	readonly first_name: string;
	readonly last_name: string;
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
	readonly term: string;
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
	readonly person_id: string;
	readonly role_id: string;
	readonly labels: LocalizedLabel;
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
	readonly string: string;
	readonly people?: PersonInfo[];
	readonly keywords?: KeywordInfo[];
	readonly roles?: RoleInfo[];
}

export type CollectionMetaData = CollectionMetaDatum[];
