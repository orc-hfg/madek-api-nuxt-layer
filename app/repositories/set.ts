import type { ApiFunction } from '../types/api';

interface SetRepository {
	getAdminPerson: (id: MadekAdminPeopleGetPathParameters['id']) => Promise<AdminPerson>;
	getCollectionMetaDatum: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], metaKeyId: MadekCollectionMetaDatumPathParameters['meta_key_id']) => Promise<CollectionMetaDatum>;
	getMediaEntries: (setId: MadekCollectionMediaEntryArcsPathParameters['collection_id']) => Promise<CollectionMediaEntryArcs>;
	getMediaEntryImagePreviews: (mediaEntryId: MadekMediaEntryPreviewPathParameters['media_entry_id']) => Promise<MediaEntryPreviewThumbnails>;
	getPreviewDataStream: (previewId: MadekPreviewsDataStreamPathParameters['preview_id']) => Promise<PreviewDataStream>;
	getMetaKeyLabels: (metaKeyId: MadekMetaKeysGetPathParameters['id']) => Promise<MetaKeyLabels>;
}

function createSetRepository($madekApi: ApiFunction): SetRepository {
	return {
		async getAdminPerson(id: MadekAdminPeopleGetPathParameters['id']): Promise<AdminPerson> {
			return $madekApi(`/admin/people/${id}`);
		},

		async getCollectionMetaDatum(setId: MadekCollectionMetaDatumPathParameters['collection_id'], metaKeyId: MadekCollectionMetaDatumPathParameters['meta_key_id']): Promise<CollectionMetaDatum> {
			return $madekApi(`/collection/${setId}/meta-datum/${metaKeyId}`);
		},

		async getMediaEntries(setId: MadekCollectionMediaEntryArcsPathParameters['collection_id']): Promise<CollectionMediaEntryArcs> {
			return $madekApi(`/collection/${setId}/media-entry-arcs`);
		},

		async getMediaEntryImagePreviews(mediaEntryId: MadekMediaEntryPreviewPathParameters['media_entry_id']): Promise<MediaEntryPreviewThumbnails> {
			return $madekApi(`/media-entry/${mediaEntryId}/preview`, {
				query: {
					media_type: 'image',
				},
			});
		},

		async getPreviewDataStream(previewId: MadekPreviewsDataStreamPathParameters['preview_id']): Promise<PreviewDataStream> {
			return $madekApi(`/previews/${previewId}/data-stream`);
		},

		async getMetaKeyLabels(metaKeyId: MadekMetaKeysGetPathParameters['id']): Promise<MetaKeyLabels> {
			return $madekApi(`/meta-keys/${metaKeyId}`);
		},
	};
}

export function getSetRepository(): SetRepository {
	const { $madekApi } = useNuxtApp();

	return createSetRepository($madekApi as ApiFunction);
}
