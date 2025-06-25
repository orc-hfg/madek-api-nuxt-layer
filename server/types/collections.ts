import type { paths } from '../../generated/api/madek-api';

// Correct access path to nested query object
type MadekCollectionsQuery = NonNullable<paths['/api-v2/collections']['get']['parameters']['query']>;
export type CollectionsUserQuery = Pick<MadekCollectionsQuery, 'responsible_user_id'>;

type MadekCollectionsArray = paths['/api-v2/collections']['get']['responses']['200']['content']['application/json']['groups'];
export interface MadekCollectionsResponse {
	collections: MadekCollectionsArray;
}

type MadekCollection = MadekCollectionsArray[number];
export type Collection = Pick<MadekCollection, 'id'>;
export type Collections = Collection[];
