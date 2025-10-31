import type { paths } from '../../generated/api/madek-api';

type MadekMediaEntryMetaDatumGet = paths['/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}']['get'];

export type MadekMediaEntryMetaDatumPathParameters = MadekMediaEntryMetaDatumGet['parameters']['path'];

/*
 * Manual type definition for media entry meta datum response.
 *
 * This interface is manually defined because the OpenAPI schema only provides
 * a generic 'string | null' type for this endpoint's response. This definition
 * is based on actual API responses and may need to be updated if the API changes.
 *
 * @see The original schema definition in '/generated/api/madek-api.d.ts' at
 * paths['/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}']['get']['responses']['200']['content']['application/json']
 * which is defined as 'string | null'.
 */
export interface MadekMediaEntryMetaDatumResponse {
	readonly 'meta-data': {
		readonly created_by_id: string;
		readonly media_entry_id: string;
		readonly collection_id: string | null;
		readonly type: string;
		readonly meta_key_id: string;
		readonly string: string | null;
		readonly id: string;
		readonly meta_data_updated_at: string;
		readonly json: Record<string, unknown> | null;
		readonly other_media_entry_id: string | null;
	};
	readonly 'defaultmetadata'?: string;
	readonly 'defaultdata'?: string;
}

/*
 * Normalized media entry meta datum.
 *
 * API service layer guarantees:
 * - string field is never null (converted to empty string)
 * - Line endings normalized to \n for consistent hydration
 */
export interface MediaEntryMetaDatum {
	readonly string: string;
}
