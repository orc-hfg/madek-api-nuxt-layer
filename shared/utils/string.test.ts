import { describe, expect, it } from 'vitest';
import { isNonEmptyString } from './string';

describe('isNonEmptyString()', () => {
	it('should return true for non-empty strings', () => {
		expect(isNonEmptyString('test')).toBe(true);
		expect(isNonEmptyString('a')).toBe(true);
	});

	it('should return false for null', () => {
		expect(isNonEmptyString(null)).toBe(false);
	});

	it('should return false for undefined', () => {
		expect(isNonEmptyString(undefined)).toBe(false);
	});

	it('should return false for empty string', () => {
		expect(isNonEmptyString('')).toBe(false);
	});

	it('should return false for whitespace-only strings', () => {
		expect(isNonEmptyString(' ')).toBe(false);
		expect(isNonEmptyString('  ')).toBe(false);
		expect(isNonEmptyString('\t')).toBe(false);
		expect(isNonEmptyString('\n')).toBe(false);
		expect(isNonEmptyString(' \t\n ')).toBe(false);
	});

	it('should return true for strings with leading/trailing whitespace and content', () => {
		expect(isNonEmptyString(' hello ')).toBe(true);
		expect(isNonEmptyString('\thello\t')).toBe(true);
		expect(isNonEmptyString('\nhello\n')).toBe(true);
	});
});
