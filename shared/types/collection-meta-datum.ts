import type { paths } from '../../generated/api/madek-api';

export type MadekCollectionMetaDatumPathParameters = paths['/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}']['get']['parameters']['path'];

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
	'defaultmetadata': string;
	'defaultdata': string;
}

export type MetaDatum = Pick<MadekCollectionMetaDatumResponse['meta-data'], 'id' | 'string'>;
