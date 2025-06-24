import type { paths } from '../../generated/api/schema';

export type MadekCollectionMetaDatumPathParameters = paths['/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}']['get']['parameters']['path'];

/**
 * Manual type definition for collection meta datum response.
 *
 * This interface is manually defined because the OpenAPI schema only provides
 * a generic 'unknown' type for this endpoint's response. This definition
 * is based on actual API responses and may need to be updated if the API changes.
 *
 * @see The original schema definition in '/generated/api/schema.d.ts' at
 * paths['/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}']['get']['responses']['200']['schema']
 * which is defined as 'unknown'.
 */
export interface MadekCollectionMetaDatumResponse {
	'meta-data': {
		collection_id: string;
		created_by_id: string;
		id: string;
		json: Record<string, any> | null;
		media_entry_id: string | null;
		meta_data_updated_at: string;
		meta_key_id: string;
		other_media_entry_id: string | null;
		string: string | null;
		type: string;
	};
	'defaultmetadata': string;
	'defaultdata': string;
}

export type MetaDatumString = Pick<MadekCollectionMetaDatumResponse['meta-data'], 'string'>;
