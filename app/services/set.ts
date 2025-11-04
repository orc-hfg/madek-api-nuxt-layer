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

const MEDIA_ENTRY_META_KEYS = {
	title: {
		de: 'madek_core:title',
		en: 'creative_work:title_en',
	},
} as const satisfies Record<string, Record<AppLocale, MadekMediaEntryMetaDatumPathParameters['meta_key_id']>>;

interface StringMetaKeyFieldData {
	label: string;
	value: string;
}

interface PeopleMetaKeyFieldData {
	label: string;
	value: PersonInfo[];
}

interface KeywordsMetaKeyFieldData {
	label: string;
	value: KeywordInfo[];
}

interface ResolvedRoleInfo {
	roleName: string;
	person: PersonInfo;
}

interface RolesMetaKeyFieldData {
	label: string;
	value: ResolvedRoleInfo[];
}

interface MediaEntryWithOptionalTitle {
	mediaEntryId: string;
	title: string | undefined;
	thumbnailSources: ThumbnailSources;
}

interface MediaEntryWithTitleAndThumbnails {
	mediaEntryId: string;
	title: string;
	thumbnailSources: ThumbnailSources;
}

interface MediaEntryWithPreviews {
	mediaEntryId: MediaEntryId;
	imagePreviews: MediaEntryPreviewThumbnails;
}

export interface SetDetailDisplayData {
	authors: PeopleMetaKeyFieldData;
	title: StringMetaKeyFieldData;
	subtitle: StringMetaKeyFieldData;
	description: StringMetaKeyFieldData;
	titleAlternativeLocale: StringMetaKeyFieldData;
	subtitleAlternativeLocale: StringMetaKeyFieldData;
	descriptionAlternativeLocale: StringMetaKeyFieldData;
	portrayedObjectDate: StringMetaKeyFieldData;
	projectCategory: KeywordsMetaKeyFieldData;
	keywords: KeywordsMetaKeyFieldData;
	semester: KeywordsMetaKeyFieldData;
	programOfStudy: KeywordsMetaKeyFieldData;
	otherCreativeParticipants: RolesMetaKeyFieldData;
	material: KeywordsMetaKeyFieldData;
	dimension: StringMetaKeyFieldData;
	duration: StringMetaKeyFieldData;
	format: StringMetaKeyFieldData;
	mediaEntries: MediaEntryWithTitleAndThumbnails[];
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
	getMediaEntryTitle: (mediaEntryId: string, appLocale: AppLocale) => Promise<string | undefined>;
	getMediaEntryThumbnailSources: (setId: MadekCollectionMediaEntryArcsPathParameters['collection_id'], mediaEntryId: string, thumbnailTypes: ThumbnailTypes[]) => Promise<ThumbnailSources>;
	getMediaEntriesWithTitlesAndThumbnails: (setId: MadekCollectionMediaEntryArcsPathParameters['collection_id'], appLocale: AppLocale, thumbnailTypes: ThumbnailTypes[]) => Promise<MediaEntryWithTitleAndThumbnails[]>;
	getSetDisplayData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale, thumbnailTypes: ThumbnailTypes[]) => Promise<SetDetailDisplayData>;
}

export function filterMediaEntriesWithAccess(mediaEntries: MediaEntryWithOptionalTitle[]): MediaEntryWithTitleAndThumbnails[] {
	return mediaEntries.filter(
		(entry): entry is MediaEntryWithTitleAndThumbnails => entry.title !== undefined,
	);
}

function createSetService(): SetService {
	const appLogger = createAppLogger('Service: Set');
	const setRepository = getSetRepository();
	const apiBaseUrl = useApiBaseUrl();

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
		 * is not included in collection meta-datum responses and must be
		 * fetched through separate AdminPerson API calls per role.
		 * The server layer only provides role structure (role_id, person_id, labels).
		 * See server/madek-api-services/collection-meta-datum/service.ts for server-side
		 * technical filtering (null-safety, referential integrity).
		 */
		const validRoles = resolvedRoles
			.filter((role): role is { roleName: string; person: AdminPerson } => role.person !== undefined && Boolean(role.person.first_name || role.person.last_name))
			.map((role) => {
				return {
					roleName: role.roleName,
					person: {
						id: role.person.id,
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

	async function getMediaEntryMetaDatum(mediaEntryId: MadekMediaEntryMetaDatumPathParameters['media_entry_id'], metaKeyId: MadekMediaEntryMetaDatumPathParameters['meta_key_id']): Promise<MediaEntryMetaDatum | undefined> {
		return setRepository.getMediaEntryMetaDatum(mediaEntryId, metaKeyId);
	}

	async function getMediaEntryImagePreviews(mediaEntryId: MadekMediaEntryPreviewPathParameters['media_entry_id']): Promise<MediaEntryPreviewThumbnails | undefined> {
		const imagePreviews = await setRepository.getMediaEntryImagePreviews(mediaEntryId);

		if (imagePreviews.length === 0) {
			return undefined;
		}

		return imagePreviews;
	}

	async function getMediaEntriesWithImagePreviews(setId: MadekMediaEntryPreviewPathParameters['media_entry_id']): Promise<MediaEntryWithPreviews[]> {
		const mediaEntries = await setRepository.getMediaEntries(setId);

		if (mediaEntries.length === 0) {
			return [];
		}

		const imagePreviewPromises = mediaEntries.map(async (mediaEntry) => {
			const imagePreviews = await getMediaEntryImagePreviews(mediaEntry.media_entry_id);

			return {
				mediaEntryId: mediaEntry.media_entry_id,
				imagePreviews,
			};
		});

		const allImagePreviews = await Promise.all(imagePreviewPromises);

		return allImagePreviews.filter((entry): entry is MediaEntryWithPreviews => entry.imagePreviews !== undefined);
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

		async getMediaEntryTitle(mediaEntryId: string, appLocale: AppLocale): Promise<string | undefined> {
			const metaKeyId = MEDIA_ENTRY_META_KEYS.title[appLocale];
			const metaDatum = await getMediaEntryMetaDatum(mediaEntryId, metaKeyId);

			/*
			 * If metaDatum is undefined, the user doesn't have access to this media entry.
			 * Return undefined to signal that this entry should be filtered out.
			 */
			if (metaDatum === undefined) {
				return undefined;
			}

			return metaDatum.string;
		},

		async getMediaEntryThumbnailSources(setId: MadekCollectionMediaEntryArcsPathParameters['collection_id'], mediaEntryId: string, thumbnailTypes: ThumbnailTypes[]): Promise<ThumbnailSources> {
			const imagePreviews = await getMediaEntryImagePreviews(mediaEntryId);

			if (!imagePreviews) {
				appLogger.warn('getMediaEntryThumbnailSources: No image previews found.', { setId, mediaEntryId });

				return {};
			}

			const thumbnailSources: ThumbnailSources = {};
			for (const thumbnailType of thumbnailTypes) {
				const previewId = getPreviewIdByThumbnailType(imagePreviews, thumbnailType);

				if (previewId === undefined) {
					appLogger.warn('getMediaEntryThumbnailSources: No preview found for thumbnail type.', { thumbnailType, mediaEntryId });
				}

				if (previewId !== undefined) {
					(thumbnailSources as Record<ThumbnailTypes, ThumbnailSource>)[thumbnailType] = {
						url: `${apiBaseUrl}/previews/${previewId}/data-stream`,
						width: getThumbnailPixelSize(thumbnailType),
					};
				}
			}

			return thumbnailSources;
		},

		async getMediaEntriesWithTitlesAndThumbnails(setId: MadekCollectionMediaEntryArcsPathParameters['collection_id'], appLocale: AppLocale, thumbnailTypes: ThumbnailTypes[]): Promise<MediaEntryWithTitleAndThumbnails[]> {
			const mediaEntriesWithImagePreviews = await getMediaEntriesWithImagePreviews(setId);

			if (mediaEntriesWithImagePreviews.length === 0) {
				appLogger.warn('getMediaEntriesWithTitlesAndThumbnails: No media entries with image previews found.', setId);

				return [];
			}

			const mediaEntriesPromises = mediaEntriesWithImagePreviews.map(async (mediaEntry): Promise<MediaEntryWithOptionalTitle> => {
				const [title, thumbnailSources] = await Promise.all([
					this.getMediaEntryTitle(mediaEntry.mediaEntryId, appLocale),
					this.getMediaEntryThumbnailSources(setId, mediaEntry.mediaEntryId, thumbnailTypes),
				]);

				return {
					mediaEntryId: mediaEntry.mediaEntryId,
					title,
					thumbnailSources,
				};
			});

			const allMediaEntries = await Promise.all(mediaEntriesPromises);

			return filterMediaEntriesWithAccess(allMediaEntries);
		},

		async getSetDisplayData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale, thumbnailTypes: ThumbnailTypes[]): Promise<SetDetailDisplayData> {
			const alternativeLocale = getAlternativeLocale(appLocale);

			/*
			 * Execute all service calls in parallel to minimize latency
			 * Each service call internally fetches label + value in parallel (2 HTTP requests)
			 */
			const [
				authors,
				title,
				subtitle,
				description,
				titleAlternativeLocale,
				subtitleAlternativeLocale,
				descriptionAlternativeLocale,
				portrayedObjectDate,
				projectCategory,
				keywords,
				semester,
				programOfStudy,
				otherCreativeParticipants,
				material,
				dimension,
				duration,
				format,
				mediaEntries,
			] = await Promise.all([
				this.getAuthorsFieldData(setId, appLocale),
				this.getTitleFieldData(setId, appLocale),
				this.getSubtitleFieldData(setId, appLocale),
				this.getDescriptionFieldData(setId, appLocale),
				this.getTitleFieldData(setId, appLocale, alternativeLocale),
				this.getSubtitleFieldData(setId, appLocale, alternativeLocale),
				this.getDescriptionFieldData(setId, appLocale, alternativeLocale),
				this.getPortrayedObjectDateFieldData(setId, appLocale),
				this.getProjectCategoryFieldData(setId, appLocale),
				this.getKeywordsFieldData(setId, appLocale),
				this.getSemesterFieldData(setId, appLocale),
				this.getProgramOfStudyFieldData(setId, appLocale),
				this.getOtherCreativeParticipantsFieldData(setId, appLocale),
				this.getMaterialFieldData(setId, appLocale),
				this.getDimensionFieldData(setId, appLocale),
				this.getDurationFieldData(setId, appLocale),
				this.getFormatFieldData(setId, appLocale),
				this.getMediaEntriesWithTitlesAndThumbnails(setId, appLocale, thumbnailTypes),
			]);

			return {
				authors,
				title,
				subtitle,
				description,
				titleAlternativeLocale,
				subtitleAlternativeLocale,
				descriptionAlternativeLocale,
				portrayedObjectDate,
				projectCategory,
				keywords,
				semester,
				programOfStudy,
				otherCreativeParticipants,
				material,
				dimension,
				duration,
				format,
				mediaEntries,
			};
		},
	};
}

export function getSetService(): SetService {
	return createSetService();
}
