import { dataUrlToBlob } from './blob';

const FIXED_COLLECTION_IDS = [
	'collection-id-1',
	'collection-id-2',
	'collection-id-3',
] as const;

export const mockData = {
	getAdminPerson: (_id: MadekAdminPeopleGetPathParameters['id']): AdminPerson => {
		return {
			first_name: 'Anja',
			last_name: 'Casser',
		};
	},
	getCollectionMediaEntryArcs: (collectionId: MadekCollectionMediaEntryArcsPathParameters['collection_id']): CollectionMediaEntryArcs => {
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

	getCollectionMetaDatum: (collectionId: MadekCollectionMetaDatumPathParameters['collection_id'], metaKeyId: MadekCollectionMetaDatumPathParameters['meta_key_id']): CollectionMetaDatum => {
		return {
			string: `Test collectionId ${collectionId} / metaKeyId ${metaKeyId} Content`,
			people: [
				{
					first_name: 'Anja',
					last_name: 'Casser',
				},
				{
					first_name: 'Hubert',
					last_name: 'Distel',
				},
				{
					first_name: 'Lizzy',
					last_name: 'Ellbrück ',
				},
				{
					first_name: 'Tiffany Justine ',
					last_name: 'Erndwein',
				},
				{
					first_name: 'Yvonne ',
					last_name: 'Fomferra ',
				},
				{
					first_name: 'Hanne',
					last_name: 'König',
				},
				{
					first_name: 'Malte',
					last_name: 'Pawelczyk',
				},
				{
					first_name: 'Christina',
					last_name: 'Scheib',
				},
				{
					first_name: 'Lisa-Kathrin',
					last_name: 'Welzel',
				},
				{
					first_name: 'Hanna',
					last_name: 'Franke',
				},
				{
					first_name: 'Hanne',
					last_name: 'König',
				},
				{
					first_name: 'Malte',
					last_name: 'Pawelczyk',
				},
				{
					first_name: 'Christina',
					last_name: 'Scheib',
				},
				{
					first_name: 'Lisa-Kathrin',
					last_name: 'Welzel',
				},
				{
					first_name: 'Hanna',
					last_name: 'Franke',
				},
			],
		};
	},

	getMediaEntryPreviewThumbnails: (mediaEntryId: MadekMediaEntryPreviewPathParameters['media_entry_id'], _query: MediaEntryPreviewQuery): MediaEntryPreviewThumbnails => [
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

	getMetaKeyLabels: (_id: MadekMetaKeysGetPathParameters['id']): MetaKeyLabels => {
		return {
			labels: {
				de: 'Meta Key DE',
				en: 'Meta Key EN',
			},
		};
	},

	getPreviewDataStream: (_previewId: MadekPreviewsDataStreamPathParameters['preview_id']): PreviewDataStream => {
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
