import { describe, expect, it } from 'vitest';
import { createDisplayName } from './user';

describe('getUserService()', () => {
	describe('createDisplayName()', () => {
		it('should create display name from first and last name', () => {
			const result = createDisplayName('John', 'Doe');

			expect(result).toBe('John Doe');
		});

		it('should handle empty first name', () => {
			const result = createDisplayName('', 'Doe');

			expect(result).toBe('Doe');
		});

		it('should handle empty last name', () => {
			const result = createDisplayName('John', '');

			expect(result).toBe('John');
		});

		it('should handle both names empty', () => {
			const result = createDisplayName('', '');

			expect(result).toBe('');
		});

		it('should handle whitespace-only names', () => {
			const result = createDisplayName('   ', '   ');

			expect(result).toBe('');
		});

		it('should trim whitespace from names', () => {
			const result = createDisplayName('  John  ', '  Doe  ');

			expect(result).toBe('John Doe');
		});
	});
});
