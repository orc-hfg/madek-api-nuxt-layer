import { normalizeTextContent } from '../../utils/text';

/*
 * Meta Datum Normalization Utilities
 *
 * Pure functions for normalizing and filtering meta datum data from the Madek API.
 * These utilities handle data integrity concerns:
 * - Null-safety (remove null entries)
 * - Whitespace normalization
 * - Referential integrity (merge related data)
 * - Structural validity (filter invalid entries)
 */

/*
 * Fallback rules for collection meta keys
 * When a requested meta key throws an error, try the fallback meta key instead
 * Example: 'creative_work:title_en' (English) → 'madek_core:title' (German fallback)
 */
const COLLECTION_META_KEYS_RETURN_FALLBACK: Record<string, string> = {
	'creative_work:title_en': 'madek_core:title',
};

// Meta keys that should return empty string instead of throwing error
const META_KEYS_RETURN_EMPTY_STRING = new Set<string>([
	'creative_work:description_en',
	'creative_work:dimension',
	'creative_work:duration',
	'creative_work:format',
	'creative_work:subtitle_en',
	'madek_core:description',
	'madek_core:portrayed_object_date',
	'madek_core:subtitle',
]);

// Meta keys that should return empty array instead of throwing error
const META_KEYS_RETURN_EMPTY_ARRAY = new Set<string>([
	'creative_work:material',
	'creative_work:other_creative_participants',
	'institution:program_of_study',
	'institution:project_category',
	'institution:semester',
	'madek_core:authors',
	'madek_core:keywords',
]);

// Meta keys where leading/trailing whitespace should be trimmed
export const META_KEYS_SHOULD_TRIM = new Set<string>([
	'creative_work:dimension',
	'creative_work:duration',
	'creative_work:format',
	'creative_work:subtitle_en',
	'creative_work:title_en',
	'madek_core:portrayed_object_date',
	'madek_core:subtitle',
	'madek_core:title',
]);

/*
 * API Response Types
 * These types represent the raw data structure from the Madek API
 */

interface PersonResponse {
	id: string;
	first_name: string | null;
	last_name: string | null;
}

interface KeywordResponse {
	id: string;
	term: string | null;
}

interface MdRoleResponse {
	role_id: string | null;
	person_id: string | null;
}

interface RoleResponse {
	id: string;
	labels: LocalizedLabel;
}

/*
 * Normalizes and filters people data
 *
 * Filtering rules:
 * - Remove null entries (null-safety)
 * - Normalize name fields to empty strings
 * - Filter out people where BOTH name fields are empty (structural validity)
 *
 * Guarantees: PersonInfo always has at least one non-empty name field
 */
export function normalizePeople(people: (PersonResponse | null)[] | undefined): PersonInfo[] {
	if (!people) {
		return [];
	}

	return people
		.filter((person): person is NonNullable<typeof person> => person !== null)
		.map((person) => {
			return {
				id: toPersonId(person.id),
				first_name: normalizeTextContent(person.first_name, true),
				last_name: normalizeTextContent(person.last_name, true),
			};
		})
		.filter(person => person.first_name || person.last_name);
}

/*
 * Normalizes and filters keywords data
 *
 * Filtering rules:
 * - Remove null entries (null-safety)
 * - Normalize term to empty string
 * - Filter out keywords with empty terms (data integrity)
 *
 * Guarantees: KeywordInfo always has non-empty term
 */
export function normalizeKeywords(keywords: (KeywordResponse | null)[] | undefined): KeywordInfo[] {
	if (!keywords) {
		return [];
	}

	return keywords
		.filter((keyword): keyword is NonNullable<typeof keyword> => keyword !== null)
		.map((keyword) => {
			return {
				id: toKeywordId(keyword.id),
				term: normalizeTextContent(keyword.term, true),
			};
		})
		.filter(keyword => keyword.term);
}

/*
 * Merges md_roles with roles to create combined role information
 *
 * md_roles contains the person-role associations (person_id, role_id)
 * roles contains the role definitions (labels, metadata)
 *
 * We merge them by matching md_roles.role_id with roles.id to create
 * a complete role info object with person_id and normalized labels.
 *
 * Filtering rules:
 * - Remove null role_id and person_id entries (null-safety)
 * - Filter out md_roles without matching role definition (referential integrity)
 * - Normalize label values to empty strings
 *
 * Note: Business-logic filtering (e.g., person name validity) happens in the
 * app service layer (see app/services/set.ts getRolesBasedFieldData).
 */
export function mergeRoles(mdRoles: MdRoleResponse[] | undefined, roles: (RoleResponse | null)[] | undefined): RoleInfo[] {
	if (!mdRoles || !roles) {
		return [];
	}

	return mdRoles
		.filter(
			(mdRole): mdRole is { role_id: string; person_id: string } & typeof mdRole => mdRole.role_id !== null && mdRole.person_id !== null,
		)
		.flatMap((mdRole) => {
			const role = roles.find(roleItem => roleItem !== null && roleItem.id === mdRole.role_id);

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
					role_id: toRoleId(mdRole.role_id),
					person_id: toPersonId(mdRole.person_id),
					labels: normalizedLabels,
				},
			];
		});
}

// Gets the fallback meta key for a given meta key (if exists)
export function getFallbackMetaKey(metaKeyId: string): string | undefined {
	return COLLECTION_META_KEYS_RETURN_FALLBACK[metaKeyId];
}

// Checks if a meta key should return empty string for a given meta key
export function shouldReturnEmptyString(metaKeyId: string): boolean {
	return META_KEYS_RETURN_EMPTY_STRING.has(metaKeyId);
}

// Checks if a meta key should return empty array for a given meta key
export function shouldReturnEmptyArray(metaKeyId: string): boolean {
	return META_KEYS_RETURN_EMPTY_ARRAY.has(metaKeyId);
}
