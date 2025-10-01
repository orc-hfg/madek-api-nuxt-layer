/*
 * Normalizes text content to prevent hydration mismatches between server and client rendering.
 *
 * Nuxt SSR renders `\r\n` (Windows line endings) differently than the client expects.
 * The Madek API may return text with `\r\n`, causing hydration mismatches during SSR.
 *
 * This function:
 * - Converts all line endings (`\r\n` and `\n`) to consistent `\n`
 * - Optionally trims whitespace for structured fields (titles, labels)
 * - Returns empty string for null/undefined values
 */
export function normalizeTextContent(value: string | null | undefined, shouldTrim = false): string {
	if (value === undefined || value === null) {
		return '';
	}

	// Normalize \r\n and \n to \n for consistent hydration
	let normalized = value.replaceAll(/\r?\n/gu, '\n');

	if (shouldTrim) {
		normalized = normalized.trim();
	}

	return normalized;
}
