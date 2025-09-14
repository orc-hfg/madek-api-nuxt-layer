import { dataUrlToBlob } from './blob';

const FIXED_COLLECTION_IDS = [
	'collection-id-1',
	'collection-id-2',
	'collection-id-3',
] as const;

export const mockData = {
	metaDatum: (collectionId: string, metaKeyId: string): MetaDatumString => {
		return {
			string: `Test collectionId ${collectionId} / metaKeyId ${metaKeyId} Content`,
		};
	},

	mediaEntryArcs: (collectionId: string): CollectionMediaEntryArcs => {
		switch (collectionId) {
			case 'collection-id-1': {
				return [
					{
						media_entry_id: 'entry-id-1',
						cover: true,
						position: 1,
					},
					{
						media_entry_id: 'entry-id-2',
						cover: false,
						position: 2,
					},
				];
			}

			case 'collection-id-2': {
				return [];
			}

			case 'collection-id-3': {
				return [
					{
						media_entry_id: 'entry-id-3',
						cover: true,
						position: 1,
					},
				];
			}

			default: {
				return [];
			}
		}
	},

	mediaEntryPreviews: (mediaEntryId: string): MediaEntryPreviews => [
		{
			id: `preview-small-${mediaEntryId}`,
			thumbnail: 'small',
			width: 100,
			height: 67,
		},
		{
			id: `preview-medium-${mediaEntryId}`,
			thumbnail: 'medium',
			width: 300,
			height: 200,
		},
		{
			id: `preview-large-${mediaEntryId}`,
			thumbnail: 'large',
			width: 620,
			height: 413,
		},
		{
			id: `preview-xlarge-${mediaEntryId}`,
			thumbnail: 'x_large',
			width: 1024,
			height: 683,
		},
	],

	previews: (_previewId: string): PreviewDataStream => {
		const blob = dataUrlToBlob('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wgARCAFoAWgDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAWAQEBAQAAAAAAAAAAAAAAAAAABAb/2gAMAwEAAhADEAAAAKZnaQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EABQQAQAAAAAAAAAAAAAAAAAAAKD/2gAIAQEAAT8AfT//xAAUEQEAAAAAAAAAAAAAAAAAAACg/9oACAECAQE/AH0//8QAFBEBAAAAAAAAAAAAAAAAAAAAoP/aAAgBAwEBPwB9P//Z');

		return blob as PreviewDataStream;
	},

	collections: (): Collections => FIXED_COLLECTION_IDS.map((id) => {
		return {
			id,
		};
	}),

	collection: (id: string): Collection => {
		return {
			id,
		};
	},
};
