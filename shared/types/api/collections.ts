import type { paths } from '../../../generated/api/schema';

export type MadekCollectionsArray = paths['/api-v2/collections']['get']['responses']['200']['schema']['collections'];

export interface MadekCollectionsResponse {
	collections: MadekCollectionsArray;
}
export type MadekCollection = MadekCollectionsArray[number];
export type Collection = Pick<MadekCollection, 'id'>;
export type Collections = Collection[];
