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
 * Fallback rules for media entry title meta keys
 * When a requested meta key throws an error, try the fallback meta key instead
 * Example: 'creative_work:title_en' (English) → 'madek_core:title' (German fallback)
 */
const MEDIA_ENTRY_META_KEYS_RETURN_FALLBACK: Record<string, string> = {
	'creative_work:title_en': 'madek_core:title',
};

// Meta keys that should return empty string for a given meta key
const META_KEYS_RETURN_EMPTY_STRING = new Set<string>(['madek_core:title']);

// Meta keys where leading/trailing whitespace should be trimmed
export const META_KEYS_SHOULD_TRIM = new Set<string>([
	'creative_work:title_en',
	'madek_core:title',
]);

// Gets the fallback meta key for a given meta key
export function getFallbackMetaKey(metaKeyId: string): string | undefined {
	return MEDIA_ENTRY_META_KEYS_RETURN_FALLBACK[metaKeyId];
}

// Checks if a meta key should return empty string for a given meta key
export function shouldReturnEmptyString(metaKeyId: string): boolean {
	return META_KEYS_RETURN_EMPTY_STRING.has(metaKeyId);
}
