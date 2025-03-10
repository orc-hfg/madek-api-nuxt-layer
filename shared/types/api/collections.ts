import type { paths } from '../../../generated/api/schema';

type MadekCollectionsQuery = paths['/api-v2/collections']['get']['parameters']['query'];
export type CollectionsQuery = Pick<MadekCollectionsQuery, 'responsible_user_id'>;

type MadekCollectionsArray = paths['/api-v2/collections']['get']['responses']['200']['schema']['collections'];
export interface MadekCollectionsResponse {
	collections: MadekCollectionsArray;
}

type MadekCollection = MadekCollectionsArray[number];
export type Collection = Pick<MadekCollection, 'id'>;
export type Collections = Collection[];
