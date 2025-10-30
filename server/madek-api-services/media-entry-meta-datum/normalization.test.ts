import { describe, expect, it } from 'vitest';
import { getFallbackMetaKey, shouldReturnEmptyString } from './normalization';

describe('getFallbackMetaKey()', () => {
	it('returns fallback meta key for creative_work:title_en', () => {
		const result = getFallbackMetaKey('creative_work:title_en');

		expect(result).toBe('madek_core:title');
	});

	it('returns undefined when no fallback exists', () => {
		const result = getFallbackMetaKey('madek_core:title');

		expect(result).toBeUndefined();
	});

	it('returns undefined for unknown meta keys', () => {
		const result = getFallbackMetaKey('unknown:meta_key');

		expect(result).toBeUndefined();
	});
});

describe('shouldReturnEmptyString()', () => {
	it('returns true for madek_core:title', () => {
		const result = shouldReturnEmptyString('madek_core:title');

		expect(result).toBe(true);
	});

	it('returns false for meta keys not in the set', () => {
		const result = shouldReturnEmptyString('creative_work:title_en');

		expect(result).toBe(false);
	});

	it('returns false for unknown meta keys', () => {
		const result = shouldReturnEmptyString('unknown:meta_key');

		expect(result).toBe(false);
	});
});
