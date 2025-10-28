import { dataUrlToBlob } from './blob';

/*
 * Helper type for query parameters that include optional test scenarios
 * Generic utility that can be used with any query type
 */
type QueryWithMockScenario<TQuery = Record<string, unknown>> = { mock_scenario?: string } & TQuery;

const FIXED_COLLECTION_IDS = [
	'collection-id-1',
	'collection-id-2',
	'collection-id-3',
] as const;

export const mockData = {
	getAdminPerson: (id: MadekAdminPeopleGetPathParameters['id']): AdminPerson => {
		return {
			first_name: `${id}_first_name`,
			last_name: `${id}_last_name`,
		};
	},
	getCollectionMediaEntryArcs: (collectionId: MadekCollectionMediaEntryArcsPathParameters['collection_id']): CollectionMediaEntryArcs => {
		const mockArcs: Record<string, CollectionMediaEntryArcs> = {
			'collection-id-1': [
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
			],
			'collection-id-2': [],
			'collection-id-3': [
				{
					media_entry_id: 'entry-id-3',
					cover: true,
					position: 1,
				},
			],
		};

		return mockArcs[collectionId] ?? [];
	},

	getCollectionMetaDatum: (collectionId: MadekCollectionMetaDatumPathParameters['collection_id'], metaKeyId: MadekCollectionMetaDatumPathParameters['meta_key_id']): CollectionMetaDatum => {
		/*
		 * For collectionId 'collection-id-1', certain meta-data should not exist (for testing purposes)
		 * Return empty but valid CollectionMetaDatum object
		 */
		if (collectionId === 'collection-id-1' && (metaKeyId === 'madek_core:subtitle' || metaKeyId === 'institution:project_category')) {
			return {
				string: '',
				keywords: [],
			};
		}
		const result = {
			string: `Test collectionId ${collectionId} / metaKeyId ${metaKeyId} Content`,
			...(metaKeyId === 'madek_core:authors' && {
				people: [
					{
						first_name: 'author_1_first_name',
						last_name: 'author_1_last_name',
					},
					{
						first_name: 'author_2_first_name',
						last_name: 'author_2_last_name',
					},
				],
			}),
			...(metaKeyId === 'institution:project_category' && {
				keywords: [
					{
						term: 'project_category_1',
					},
					{
						term: 'project_category_2',
					},
				],
			}),
			...(metaKeyId === 'madek_core:keywords' && {
				keywords: [
					{
						term: 'keyword_1',
					},
					{
						term: 'keyword_2',
					},
				],
			}),
			...(metaKeyId === 'institution:semester' && {
				keywords: [
					{
						term: 'semester_1',
					},
					{
						term: 'semester_2',
					},
				],
			}),
			...(metaKeyId === 'institution:program_of_study' && {
				keywords: [
					{
						term: 'program_of_study_1',
					},
					{
						term: 'program_of_study_2',
					},
				],
			}),
			...(metaKeyId === 'creative_work:other_creative_participants' && {
				roles: [
					{
						person_id: 'person_id_1',
						role_id: 'role_id_1',
						labels: {
							de: 'role_1_DE',
							en: 'role_1_EN',
						},
					},
					{
						person_id: 'person_id_2',
						role_id: 'role_id_2',
						labels: {
							de: 'role_2_DE',
							en: 'role_2_EN',
						},
					},
				],
			}),
			...(metaKeyId === 'creative_work:material' && {
				keywords: [
					{
						term: 'material_1',
					},
					{
						term: 'material_2',
					},
				],
			}),
		};

		return result;
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

	getMetaKeyLabels: (id: MadekMetaKeysGetPathParameters['id']): MetaKeyLabels => {
		const mockLabels: Record<string, MetaKeyLabels> = {
			'madek_core:authors': {
				labels: {
					de: 'Autor/in',
					en: 'Author',
				},
			},
			'madek_core:title': {
				labels: {
					de: 'Titel',
					en: 'Title',
				},
			},
			'madek_core:subtitle': {
				labels: {
					de: 'Untertitel',
					en: 'Subtitle',
				},
			},
			'madek_core:description': {
				labels: {
					de: 'Beschreibung',
					en: 'Description',
				},
			},
			'creative_work:title_en': {
				labels: {
					de: 'Titel (en)',
					en: 'Title (en)',
				},
			},
			'creative_work:subtitle_en': {
				labels: {
					de: 'Untertitel (en)',
					en: 'Subtitle (en)',
				},
			},
			'creative_work:description_en': {
				labels: {
					de: 'Beschreibung (en)',
					en: 'Description (en)',
				},
			},
			'madek_core:portrayed_object_date': {
				labels: {
					de: 'Datierung',
					en: 'Date',
				},
			},
			'institution:project_category': {
				labels: {
					de: 'Kategorie',
					en: 'Category',
				},
			},
			'madek_core:keywords': {
				labels: {
					de: 'Schlagworte',
					en: 'Keywords',
				},
			},
			'institution:semester': {
				labels: {
					de: 'Semester',
					en: 'Semester',
				},
			},
			'institution:program_of_study': {
				labels: {
					de: 'Studiengang',
					en: 'Program of Study',
				},
			},
			'creative_work:other_creative_participants': {
				labels: {
					de: 'Mitwirkende / weitere Personen',
					en: 'Contributors / other persons',
				},
			},
			'creative_work:material': {
				labels: {
					de: 'Material',
					en: 'Material',
				},
			},
			'creative_work:dimension': {
				labels: {
					de: 'Abmessungen',
					en: 'Dimensions',
				},
			},
			'creative_work:duration': {
				labels: {
					de: 'Dauer',
					en: 'Duration',
				},
			},
			'creative_work:format': {
				labels: {
					de: 'Technik/Verfahren/Formate',
					en: 'Technology/production/formats',
				},
			},
		};

		return mockLabels[id] ?? {
			labels: {
				de: `Meta Key DE (${id})`,
				en: `Meta Key EN (${id})`,
			},
		};
	},

	getPreviewDataStream: (_previewId: MadekPreviewsDataStreamPathParameters['preview_id']): PreviewDataStream => {
		const blob = dataUrlToBlob('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wgARCAFoAWgDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAWAQEBAQAAAAAAAAAAAAAAAAAABAb/2gAMAwEAAhADEAAAAKZnaQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EABQQAQAAAAAAAAAAAAAAAAAAAKD/2gAIAQEAAT8AfT//xAAUEQEAAAAAAAAAAAAAAAAAAACg/9oACAECAQE/AH0//8QAFBEBAAAAAAAAAAAAAAAAAAAAoP/aAAgBAwEBPwB9P//Z');

		return blob as PreviewDataStream;
	},

	getAuthInfo: (): AuthInfo => {
		return {
			id: 'user-id-1',
			login: 'login',
			first_name: 'first_name',
			last_name: 'last_name',
		};
	},

	getCollections: (query: CollectionsQuery): Collections => {
		/*
		 * Support mock scenarios for E2E testing via query parameter
		 * Usage: /api/collections?mock_scenario=empty
		 */
		const scenario = (query as QueryWithMockScenario<CollectionsQuery>).mock_scenario;

		if (scenario === 'empty') {
			return [];
		}

		// Default: return all collections
		return FIXED_COLLECTION_IDS.map((id) => {
			return {
				id,
			};
		});
	},
};
