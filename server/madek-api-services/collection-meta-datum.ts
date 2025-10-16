import type { H3Event } from 'h3';
import type { LocalizedLabel } from '../../shared/types/meta-keys';
import { fiveMinutesCache } from '../constants/cache';
import { handleServiceError, isH3NotFoundError } from '../utils/error-handling';
import { createMadekApiClient } from '../utils/madek-api';

/*
 * API Service Layer - Collection Meta Datum
 *
 * Responsibility: Data retrieval and normalization
 * - Fetch data from external APIs
 * - Normalize data (null conversion, whitespace trimming, line ending normalization)
 * - Technical filtering: Data structure integrity (null-safety, referential integrity)
 *
 * App Service Layer handles business-logic filtering (e.g., filtering entries with empty display values)
 * See readme.architecture.md for complete architecture documentation
 */

/*
 * Fallback rules for set title meta keys
 * When a requested meta key returns 404, try the fallback meta key instead
 * Example: 'creative_work:title_en' (English) → 'madek_core:title' (German fallback)
 */
const SET_TITLE_META_KEY_FALLBACKS: Record<MadekCollectionMetaDatumPathParameters['meta_key_id'], MadekCollectionMetaDatumPathParameters['meta_key_id']> = {
	'creative_work:title_en': 'madek_core:title',
};

/*
 * Meta keys that should return empty string instead of throwing 404 error
 * When a requested meta key returns 404, return empty string instead
 */
const META_KEYS_RETURN_EMPTY_STRING_ON_404 = new Set<MadekCollectionMetaDatumPathParameters['meta_key_id']>([
	'creative_work:description_en',
	'creative_work:dimension',
	'creative_work:duration',
	'creative_work:format',
	'creative_work:subtitle_en',
	'madek_core:description',
	'madek_core:portrayed_object_date',
	'madek_core:subtitle',
]);

/*
 * Meta keys that should return empty array instead of throwing 404 error
 * When a requested meta key returns 404, return empty array instead
 */
const META_KEYS_RETURN_EMPTY_ARRAY_ON_404 = new Set<MadekCollectionMetaDatumPathParameters['meta_key_id']>([
	'creative_work:material',
	'creative_work:other_creative_participants',
	'institution:program_of_study',
	'institution:project_category',
	'institution:semester',
	'madek_core:authors',
	'madek_core:keywords',
]);

/*
 * Meta keys where leading/trailing whitespace should be trimmed
 *
 * Trimming is applied to structured short text fields (titles, subtitles) to ensure
 * clean display in UI components. Description fields are NOT trimmed to preserve
 * intentional formatting and line breaks in longer text content.
 */
const META_KEYS_SHOULD_TRIM = new Set<MadekCollectionMetaDatumPathParameters['meta_key_id']>([
	'creative_work:dimension',
	'creative_work:duration',
	'creative_work:format',
	'creative_work:subtitle_en',
	'creative_work:title_en',
	'madek_core:portrayed_object_date',
	'madek_core:subtitle',
	'madek_core:title',
]);

export async function getCollectionMetaDatum(event: H3Event, collectionId: MadekCollectionMetaDatumPathParameters['collection_id'], metaKeyId: MadekCollectionMetaDatumPathParameters['meta_key_id']): Promise<CollectionMetaDatum> {
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekCollectionMetaDatumResponse>(event);
	const serverLogger = createServerLogger(event, 'API Service: getCollectionMetaDatum');

	serverLogger.info('Collection ID:', collectionId);
	serverLogger.info('Meta Key ID:', metaKeyId);

	try {
		const response = await fetchFromApiWithPathParameters(
			'collection/:collectionId/meta-datum/:metaKeyId',
			{
				collectionId,
				metaKeyId,
			},
			{
				apiOptions: {
					isAuthenticationNeeded: false,
				},
				publicDataCache: fiveMinutesCache,
			},
		);

		return {
			string: normalizeTextContent(
				response['meta-data'].string,
				META_KEYS_SHOULD_TRIM.has(metaKeyId),
			),

			/*
			 * People normalization and filtering (API Layer responsibility)
			 *
			 * API Layer filters for DATA INTEGRITY:
			 * - Remove null entries (null-safety)
			 * - Normalize name fields to empty strings
			 * - Filter out people where BOTH name fields are empty (structural validity)
			 *
			 * App Layer filters for BUSINESS LOGIC (see app/services/set.ts):
			 * - Roles filtering requires AdminPerson API data (not available here)
			 *
			 * Guarantees: PersonInfo always has at least one non-empty name field
			 */
			...(response.people && {
				people: response.people
					.filter((person): person is NonNullable<typeof person> => person !== null)
					.map((person) => {
						return {
							first_name: normalizeTextContent(person.first_name, true),
							last_name: normalizeTextContent(person.last_name, true),
						};
					})
					.filter(person => person.first_name || person.last_name),
			}),

			/*
			 * Keywords normalization and filtering
			 * - Remove null entries (null-safety)
			 * - Normalize term to empty string
			 * - Filter out keywords with empty terms (data integrity)
			 * Guarantees: KeywordInfo always has non-empty term
			 */
			...(response.keywords && {
				keywords: response.keywords
					.filter((keyword): keyword is NonNullable<typeof keyword> => keyword !== null)
					.map((keyword) => {
						return {
							term: normalizeTextContent(keyword.term, true),
						};
					})
					.filter(keyword => keyword.term),
			}),

			/*
			 * Merge md_roles with roles to create combined role information
			 *
			 * md_roles contains the person-role associations (person_id, role_id)
			 * roles contains the role definitions (labels, metadata)
			 *
			 * We merge them by matching md_roles.role_id with roles.id to create
			 * a complete role info object with person_id and normalized labels.
			 *
			 * Note: Technical filtering (null-safety, referential integrity) happens here
			 * in the API service layer to ensure data structure can be built.
			 * Business-logic filtering (e.g., person name validity) happens in the
			 * app service layer (see app/services/set.ts getRolesBasedFieldData).
			 */
			...(response.md_roles && response.roles && {
				roles: response.md_roles
					.filter((mdRole): mdRole is { role_id: string; person_id: string } & typeof mdRole => mdRole.role_id !== null && mdRole.person_id !== null)
					.flatMap((mdRole) => {
						const role = response.roles?.find(roleItem => roleItem !== null && roleItem.id === mdRole.role_id);

						if (!role) {
							return [];
						}

						const normalizedLabels: LocalizedLabel = {
							// eslint-disable-next-line unicorn/no-null
							de: null,
							// eslint-disable-next-line unicorn/no-null
							en: null,
						};

						for (const [key, value] of Object.entries(role.labels)) {
							normalizedLabels[key as keyof LocalizedLabel] = normalizeTextContent(value, true);
						}

						return [
							{
								role_id: mdRole.role_id,
								person_id: mdRole.person_id,
								labels: normalizedLabels,
							},
						];
					}),
			}),
		};
	}
	catch (error) {
		if (isH3NotFoundError(error)) {
			// Check if this meta key should return empty array on 404
			if (META_KEYS_RETURN_EMPTY_ARRAY_ON_404.has(metaKeyId)) {
				serverLogger.warn(`Meta key ${metaKeyId} returned 404, returning empty array instead.`);

				return {
					string: '',
					people: [],
					keywords: [],
					roles: [],
				};
			}

			// Check if this meta key should return empty string on 404
			if (META_KEYS_RETURN_EMPTY_STRING_ON_404.has(metaKeyId)) {
				serverLogger.warn(`Meta key ${metaKeyId} returned 404, returning empty string instead.`);

				return {
					string: '',
				};
			}

			// Check for fallback meta key
			const fallbackMetaKeyId = SET_TITLE_META_KEY_FALLBACKS[metaKeyId];
			if (fallbackMetaKeyId) {
				serverLogger.warn(`Meta key ${metaKeyId} returned 404, trying fallback meta key ${fallbackMetaKeyId}.`);

				return getCollectionMetaDatum(event, collectionId, fallbackMetaKeyId);
			}
		}

		return handleServiceError(serverLogger, error, 'Failed to fetch collection meta datum.');
	}
}
