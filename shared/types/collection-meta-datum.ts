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

/**
 * Simplified person information for collection meta data.
 * Contains only essential display fields.
 * Note: Names are normalized strings (never null), but may be empty if only one name is present.
 */
export interface PersonInfo {
	first_name: string;
	last_name: string;
}

/**
 * Simplified keyword information for collection meta data.
 * Contains only the term field for display.
 * Note: Term is normalized and guaranteed to be a non-empty string (empty terms are filtered out).
 */
export interface KeywordInfo {
	term: string;
}

/**
 * Simplified role information for collection meta data.
 * Combines fields from md_roles (for linking) and roles (for display).
 * Note: person_id and role_id are guaranteed non-null because server-side filtering removes null values.
 */
interface RoleInfo {
	person_id: string;
	role_id: string;
	labels: LocalizedLabel;
}

/*
 * Normalized collection meta datum with guaranteed non-null string value.
 *
 * This type represents the data AFTER server-side normalization:
 * - null values are converted to empty strings
 * - Line endings are normalized to \n for consistent hydration
 */
export interface CollectionMetaDatum {
	string: string;
	people?: PersonInfo[];
	keywords?: KeywordInfo[];
	roles?: RoleInfo[];
}
export type CollectionMetaData = CollectionMetaDatum[];
