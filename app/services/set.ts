import type { AppLocale } from '../types/locale';

const SET_META_KEYS = {
	authors: {
		de: 'madek_core:authors',
		en: 'madek_core:authors',
	},
	title: {
		de: 'madek_core:title',
		en: 'creative_work:title_en',
	},
	subtitle: {
		de: 'madek_core:subtitle',
		en: 'creative_work:subtitle_en',
	},
	description: {
		de: 'madek_core:description',
		en: 'creative_work:description_en',
	},
	portrayedObjectDate: {
		de: 'madek_core:portrayed_object_date',
		en: 'madek_core:portrayed_object_date',
	},
	projectCategory: {
		de: 'institution:project_category',
		en: 'institution:project_category',
	},
	keywords: {
		de: 'madek_core:keywords',
		en: 'madek_core:keywords',
	},
	semester: {
		de: 'institution:semester',
		en: 'institution:semester',
	},
	programOfStudy: {
		de: 'institution:program_of_study',
		en: 'institution:program_of_study',
	},
	otherCreativeParticipants: {
		de: 'creative_work:other_creative_participants',
		en: 'creative_work:other_creative_participants',
	},
	material: {
		de: 'creative_work:material',
		en: 'creative_work:material',
	},
	dimension: {
		de: 'creative_work:dimension',
		en: 'creative_work:dimension',
	},
	duration: {
		de: 'creative_work:duration',
		en: 'creative_work:duration',
	},
	format: {
		de: 'creative_work:format',
		en: 'creative_work:format',
	},
} as const satisfies Record<string, Record<AppLocale, MadekCollectionMetaDatumPathParameters['meta_key_id']>>;

type SetMetaKeyField = keyof typeof SET_META_KEYS;

export interface StringMetaKeyFieldData {
	readonly label: string;
	readonly value: string;
}

export interface PeopleMetaKeyFieldData {
	readonly label: string;
	readonly value: PersonInfo[];
}

export interface KeywordsMetaKeyFieldData {
	readonly label: string;
	readonly value: KeywordInfo[];
}

interface ResolvedRoleInfo {
	readonly roleName: string;
	readonly person: PersonInfo;
}

export interface RolesMetaKeyFieldData {
	readonly label: string;
	readonly value: ResolvedRoleInfo[];
}

interface SetService {
	getAuthorsFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<PeopleMetaKeyFieldData>;
	getTitle: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<CollectionMetaDatum>;
	getTitleFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale, alternativeLocale?: AppLocale) => Promise<StringMetaKeyFieldData>;
	getSubtitleFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale, alternativeLocale?: AppLocale) => Promise<StringMetaKeyFieldData>;
	getDescriptionFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale, alternativeLocale?: AppLocale) => Promise<StringMetaKeyFieldData>;
	getPortrayedObjectDateFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getProjectCategoryFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<KeywordsMetaKeyFieldData>;
	getKeywordsFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<KeywordsMetaKeyFieldData>;
	getSemesterFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<KeywordsMetaKeyFieldData>;
	getProgramOfStudyFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<KeywordsMetaKeyFieldData>;
	getOtherCreativeParticipantsFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<RolesMetaKeyFieldData>;
	getMaterialFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<KeywordsMetaKeyFieldData>;
	getDimensionFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getDurationFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getFormatFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
}

function createSetService(): SetService {
	const appLogger = createAppLogger('Service: Set');
	const setRepository = getSetRepository();

	async function getMetaKeyLabel(metaKeyId: MadekMetaKeysGetPathParameters['id'], appLocale: AppLocale): Promise<string> {
		const metaKeyLabels = await setRepository.getMetaKeyLabels(metaKeyId);

		return getLocalizedLabel(metaKeyLabels.labels, appLocale, 'Meta key', metaKeyId, appLogger);
	}

	async function getMetaDatum(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<CollectionMetaDatum> {
		const metaKeyId = SET_META_KEYS[field][appLocale];

		return setRepository.getCollectionMetaDatum(setId, metaKeyId);
	}

	async function getMetaDatumByMetaKeyId(setId: MadekCollectionMetaDatumPathParameters['collection_id'], metaKeyId: MadekCollectionMetaDatumPathParameters['meta_key_id']): Promise<CollectionMetaDatum> {
		return setRepository.getCollectionMetaDatum(setId, metaKeyId);
	}

	async function getMetaDatumFieldData(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale, alternativeLocale?: AppLocale): Promise<StringMetaKeyFieldData> {
		/*
		 * Use alternativeLocale (if provided) to determine which field to fetch,
		 * But always display the label in the current appLocale
		 */
		const metaKeyLocale = alternativeLocale ?? appLocale;
		const metaKeyId = SET_META_KEYS[field][metaKeyLocale];

		const [metaKeyLabel, metaKeyValue] = await Promise.all([
			getMetaKeyLabel(metaKeyId, appLocale),
			getMetaDatumByMetaKeyId(setId, metaKeyId),
		]);

		return {
			label: metaKeyLabel,
			value: metaKeyValue.string,
		};
	}

	async function getPeopleBasedFieldData(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<PeopleMetaKeyFieldData> {
		const metaKeyId = SET_META_KEYS[field][appLocale];

		const [metaKeyLabel, metaKeyValue] = await Promise.all([
			getMetaKeyLabel(metaKeyId, appLocale),
			getMetaDatum(field, setId, appLocale),
		]);

		return {
			label: metaKeyLabel,
			value: metaKeyValue.people ?? [],
		};
	}

	async function getKeywordsBasedFieldData(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
		const metaKeyId = SET_META_KEYS[field][appLocale];

		const [metaKeyLabel, metaKeyValue] = await Promise.all([
			getMetaKeyLabel(metaKeyId, appLocale),
			getMetaDatum(field, setId, appLocale),
		]);

		return {
			label: metaKeyLabel,
			value: metaKeyValue.keywords ?? [],
		};
	}

	function getRoleLabel(labels: MadekRole['labels'], appLocale: AppLocale, roleId: MadekRole['id']): string {
		return getLocalizedLabel(labels, appLocale, 'Role', roleId, appLogger);
	}

	async function getRolesBasedFieldData(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<RolesMetaKeyFieldData> {
		const metaKeyId = SET_META_KEYS[field][appLocale];

		const [metaKeyLabel, metaKeyValue] = await Promise.all([
			getMetaKeyLabel(metaKeyId, appLocale),
			getMetaDatum(field, setId, appLocale),
		]);

		const roles = metaKeyValue.roles ?? [];

		/*
		 * Resolve all roles with their person information first
		 * Note: We must fetch AdminPerson data before we can determine if the person
		 * has valid names, so filtering happens after resolution (not before)
		 */
		const rolePromises = roles.map(async (role): Promise<{ roleName: string; person: AdminPerson | undefined }> => {
			const roleName = getRoleLabel(role.labels, appLocale, role.role_id);
			const person = await setRepository.getAdminPerson(role.person_id);

			return {
				roleName,
				person,
			};
		});

		const resolvedRoles = await Promise.all(rolePromises);

		/*
		 * Filter out roles where:
		 * - Person does not exist (undefined from 404, person was deleted)
		 * - Person has no valid name (both fields empty)
		 *
		 * Note: This filtering must happen in app layer because person data
		 * is fetched separately via AdminPerson API (not available in API layer)
		 */
		const validRoles = resolvedRoles
			.filter((role): role is { roleName: string; person: AdminPerson } => role.person !== undefined && Boolean(role.person.first_name || role.person.last_name))
			.map((role) => {
				return {
					roleName: role.roleName,
					person: {
						first_name: role.person.first_name,
						last_name: role.person.last_name,
					},
				};
			});

		return {
			label: metaKeyLabel,
			value: validRoles,
		};
	}

	return {
		async getAuthorsFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<PeopleMetaKeyFieldData> {
			return getPeopleBasedFieldData('authors', setId, appLocale);
		},

		async getTitle(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<CollectionMetaDatum> {
			return getMetaDatum('title', setId, appLocale);
		},

		async getTitleFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale, alternativeLocale?: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('title', setId, appLocale, alternativeLocale);
		},

		async getSubtitleFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale, alternativeLocale?: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('subtitle', setId, appLocale, alternativeLocale);
		},

		async getDescriptionFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale, alternativeLocale?: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('description', setId, appLocale, alternativeLocale);
		},

		async getPortrayedObjectDateFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('portrayedObjectDate', setId, appLocale);
		},

		async getProjectCategoryFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
			return getKeywordsBasedFieldData('projectCategory', setId, appLocale);
		},

		async getKeywordsFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
			return getKeywordsBasedFieldData('keywords', setId, appLocale);
		},

		async getSemesterFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
			return getKeywordsBasedFieldData('semester', setId, appLocale);
		},

		async getProgramOfStudyFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
			return getKeywordsBasedFieldData('programOfStudy', setId, appLocale);
		},

		async getOtherCreativeParticipantsFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<RolesMetaKeyFieldData> {
			return getRolesBasedFieldData('otherCreativeParticipants', setId, appLocale);
		},

		async getMaterialFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
			return getKeywordsBasedFieldData('material', setId, appLocale);
		},

		async getDimensionFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('dimension', setId, appLocale);
		},

		async getDurationFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('duration', setId, appLocale);
		},

		async getFormatFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('format', setId, appLocale);
		},
	};
}

export function getSetService(): SetService {
	return createSetService();
}
