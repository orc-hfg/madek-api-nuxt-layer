import type { paths } from '../../generated/api/madek-api';
import type { MediaEntryId } from './branded';

type MadekCollectionMediaEntryArcsGet = paths['/api-v2/collection/{collection_id}/media-entry-arcs']['get'];

export type MadekCollectionMediaEntryArcsPathParameters = MadekCollectionMediaEntryArcsGet['parameters']['path'];

type MadekCollectionMediaEntryArcsArray
	= MadekCollectionMediaEntryArcsGet['responses']['200']['content']['application/json']['collection-media-entry-arcs'];

export interface MadekCollectionMediaEntryArcsResponse {
	readonly 'collection-media-entry-arcs': MadekCollectionMediaEntryArcsArray;
}

type MadekCollectionMediaEntryArc = NonNullable<MadekCollectionMediaEntryArcsArray>[number];

type MadekCollectionMediaEntryArcBase = Pick<MadekCollectionMediaEntryArc, 'media_entry_id' | 'cover' | 'position'>;

export interface CollectionMediaEntryArc {
	readonly media_entry_id: MediaEntryId;
	readonly cover: MadekCollectionMediaEntryArcBase['cover'];
	readonly position: MadekCollectionMediaEntryArcBase['position'];
}

export type CollectionMediaEntryArcs = CollectionMediaEntryArc[];
