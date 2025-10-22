import { describe, expect, it } from 'vitest';
import { normalizeTextContent } from './text';

describe('normalizeTextContent()', () => {
	describe('null and undefined handling', () => {
		it('should return empty string for null', () => {
			expect(normalizeTextContent(null)).toBe('');
		});

		it('should return empty string for undefined', () => {
			expect(normalizeTextContent(undefined)).toBe('');
		});
	});

	describe('line ending normalization', () => {
		it('should normalize Windows line endings to Unix', () => {
			expect(normalizeTextContent('line1\r\nline2\r\nline3')).toBe('line1\nline2\nline3');
		});

		it('should preserve Unix line endings', () => {
			expect(normalizeTextContent('line1\nline2\nline3')).toBe('line1\nline2\nline3');
		});

		it('should handle mixed line endings', () => {
			expect(normalizeTextContent('line1\r\nline2\nline3\r\nline4')).toBe('line1\nline2\nline3\nline4');
		});

		it('should handle multiple consecutive line endings', () => {
			expect(normalizeTextContent('line1\r\n\r\nline2')).toBe('line1\n\nline2');
			expect(normalizeTextContent('line1\n\nline2')).toBe('line1\n\nline2');
		});
	});

	describe('trimming behavior (shouldTrim = false, default)', () => {
		it('should preserve leading and trailing whitespace by default', () => {
			expect(normalizeTextContent('  hello  ')).toBe('  hello  ');
			expect(normalizeTextContent('\thello\t')).toBe('\thello\t');
		});

		it('should preserve whitespace-only strings', () => {
			expect(normalizeTextContent('   ')).toBe('   ');
			expect(normalizeTextContent('\t\t')).toBe('\t\t');
		});

		it('should preserve empty string', () => {
			expect(normalizeTextContent('')).toBe('');
		});

		it('should preserve internal whitespace', () => {
			expect(normalizeTextContent('hello  world')).toBe('hello  world');
		});
	});

	describe('trimming behavior (shouldTrim = true)', () => {
		it('should trim leading and trailing whitespace when shouldTrim is true', () => {
			expect(normalizeTextContent('  hello  ', true)).toBe('hello');
			expect(normalizeTextContent('\thello\t', true)).toBe('hello');
			expect(normalizeTextContent('\nhello\n', true)).toBe('hello');
		});

		it('should convert whitespace-only strings to empty string when shouldTrim is true', () => {
			expect(normalizeTextContent('   ', true)).toBe('');
			expect(normalizeTextContent('\t\t', true)).toBe('');
			expect(normalizeTextContent('\n\n', true)).toBe('');
			expect(normalizeTextContent(' \t\n ', true)).toBe('');
		});

		it('should preserve internal whitespace when shouldTrim is true', () => {
			expect(normalizeTextContent('  hello  world  ', true)).toBe('hello  world');
		});
	});

	describe('combined scenarios', () => {
		it('should normalize line endings and preserve whitespace (shouldTrim = false)', () => {
			expect(normalizeTextContent('  line1\r\n  line2  ')).toBe('  line1\n  line2  ');
		});

		it('should normalize line endings and trim whitespace (shouldTrim = true)', () => {
			expect(normalizeTextContent('  line1\r\n  line2  ', true)).toBe('line1\n  line2');
		});

		it('should handle complex real-world text', () => {
			const input = 'Title: Example\r\n\r\nDescription: This is a test.\r\n';
			const expected = 'Title: Example\n\nDescription: This is a test.\n';

			expect(normalizeTextContent(input)).toBe(expected);
		});

		it('should handle complex real-world text with trimming', () => {
			const input = '  Title: Example\r\n\r\nDescription: This is a test.\r\n  ';
			const expected = 'Title: Example\n\nDescription: This is a test.';

			expect(normalizeTextContent(input, true)).toBe(expected);
		});
	});
});
