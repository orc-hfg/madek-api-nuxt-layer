import type { paths } from '../../generated/api/madek-api';

type MadekCollectionMediaEntryArcsGet = paths['/api-v2/collection/{collection_id}/media-entry-arcs']['get'];

export type MadekCollectionMediaEntryArcsPathParameters = MadekCollectionMediaEntryArcsGet['parameters']['path'];

type MadekCollectionMediaEntryArcsArray = MadekCollectionMediaEntryArcsGet['responses']['200']['content']['application/json']['collection-media-entry-arcs'];
export interface MadekCollectionMediaEntryArcsResponse {
	'collection-media-entry-arcs': MadekCollectionMediaEntryArcsArray;
}

type MadekCollectionMediaEntryArc = MadekCollectionMediaEntryArcsArray[number];

export type CollectionMediaEntryArc = Pick<MadekCollectionMediaEntryArc, 'media_entry_id' | 'cover' | 'position'>;
export type CollectionMediaEntryArcs = CollectionMediaEntryArc[];
