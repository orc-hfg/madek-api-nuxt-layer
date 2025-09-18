import { dataUrlToBlob } from './blob';

const FIXED_COLLECTION_IDS = [
	'collection-id-1',
	'collection-id-2',
	'collection-id-3',
] as const;

export const mockData = {
	getCollectionMediaEntryArcs: (collectionId: string): CollectionMediaEntryArcs => {
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

	getCollectionMetaDatum: (collectionId: string, metaKeyId: string): CollectionMetaDatum => {
		return {
			string: `Test collectionId ${collectionId} / metaKeyId ${metaKeyId} Content`,
		};
	},

	getContext: (_id: string): Context => {
		return {
			id: 'core',
			labels: {
				de: 'Core DE',
				en: 'Core EN',
			},
		};
	},

	getContexts: (): Contexts => [
		{
			id: 'core',
			labels: {
				de: 'Core DE',
				en: 'Core EN',
			},
		},
		{
			id: 'media-object',
			labels: {
				de: 'Media Object DE',
				en: 'Media Object EN',
			},
		},
		{
			id: 'set_creative-work',
			labels: {
				de: 'Set Creative Work DE',
				en: 'Set Creative Work EN',
			},
		},
	],

	getMediaEntryPreviewThumbnails: (mediaEntryId: string, _query: MediaEntryPreviewQuery): MediaEntryPreviewThumbnails => [
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

	getPreviewDataStream: (_previewId: string): PreviewDataStream => {
		const blob = dataUrlToBlob('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wgARCAFoAWgDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAWAQEBAQAAAAAAAAAAAAAAAAAABAb/2gAMAwEAAhADEAAAAKZnaQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EABQQAQAAAAAAAAAAAAAAAAAAAKD/2gAIAQEAAT8AfT//xAAUEQEAAAAAAAAAAAAAAAAAAACg/9oACAECAQE/AH0//8QAFBEBAAAAAAAAAAAAAAAAAAAAoP/aAAgBAwEBPwB9P//Z');

		return blob as PreviewDataStream;
	},

	getAppSettings: (): AppSettings => {
		return {
			default_locale: 'de_DE',
		};
	},

	getAuthInfo: (): AuthInfo => {
		return {
			id: 'user-id-1',
			login: 'login',
			first_name: 'first_name',
			last_name: 'last_name',
		};
	},

	getCollections: (_query: CollectionsQuery): Collections => FIXED_COLLECTION_IDS.map((id) => {
		return {
			id,
		};
	}),
};
