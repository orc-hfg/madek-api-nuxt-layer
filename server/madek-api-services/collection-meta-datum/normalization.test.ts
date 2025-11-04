import { describe, expect, it } from 'vitest';
import { getFallbackMetaKey, mergeRoles, normalizeKeywords, normalizePeople, shouldReturnEmptyArray, shouldReturnEmptyString } from './normalization';

describe('normalizePeople()', () => {
	it('should return empty array when people is undefined', () => {
		expect(normalizePeople(undefined)).toStrictEqual([]);
	});

	it('should filter out null entries', () => {
		const people = [
			{ id: 'person-test', first_name: 'John', last_name: 'Doe' },
			null,
			{ id: 'person-test', first_name: 'Jane', last_name: 'Smith' },
		];

		const result = normalizePeople(people);

		expect(result).toHaveLength(2);
		expect(result[0]).toStrictEqual({ id: 'person-test', first_name: 'John', last_name: 'Doe' });
		expect(result[1]).toStrictEqual({ id: 'person-test', first_name: 'Jane', last_name: 'Smith' });
	});

	it('should normalize null names to empty strings', () => {
		const people = [
			{ id: 'person-test', first_name: null, last_name: 'Doe' },
			{ id: 'person-test', first_name: 'Jane', last_name: null },
		];

		const result = normalizePeople(people);

		expect(result).toStrictEqual([
			{ id: 'person-test', first_name: '', last_name: 'Doe' },
			{ id: 'person-test', first_name: 'Jane', last_name: '' },
		]);
	});

	it('should trim whitespace from names', () => {
		const people = [
			{ id: 'person-test', first_name: '  John  ', last_name: '  Doe  ' },
			{ id: 'person-test', first_name: '\tJane\t', last_name: '\nSmith\n' },
		];

		const result = normalizePeople(people);

		expect(result).toStrictEqual([
			{ id: 'person-test', first_name: 'John', last_name: 'Doe' },
			{ id: 'person-test', first_name: 'Jane', last_name: 'Smith' },
		]);
	});

	it('should filter out people with both names empty', () => {
		const people = [
			{ id: 'person-test', first_name: '', last_name: '' },
			{ id: 'person-test', first_name: '   ', last_name: '   ' },
			{ id: 'person-test', first_name: null, last_name: null },
		];

		const result = normalizePeople(people);

		expect(result).toStrictEqual([]);
	});

	it('should keep people with at least one non-empty name', () => {
		const people = [
			{ id: 'person-test', first_name: 'John', last_name: '' },
			{ id: 'person-test', first_name: '', last_name: 'Doe' },
			{ id: 'person-test', first_name: '', last_name: '' },
		];

		const result = normalizePeople(people);

		expect(result).toStrictEqual([
			{ id: 'person-test', first_name: 'John', last_name: '' },
			{ id: 'person-test', first_name: '', last_name: 'Doe' },
		]);
	});
});

describe('normalizeKeywords()', () => {
	it('should return empty array when keywords is undefined', () => {
		expect(normalizeKeywords(undefined)).toStrictEqual([]);
	});

	it('should filter out null entries', () => {
		const keywords = [
			{ id: 'keyword-test', term: 'Art' },
			null,
			{ id: 'keyword-test', term: 'Design' },
		];

		const result = normalizeKeywords(keywords);

		expect(result).toHaveLength(2);
		expect(result[0]).toStrictEqual({ id: 'keyword-test', term: 'Art' });
		expect(result[1]).toStrictEqual({ id: 'keyword-test', term: 'Design' });
	});

	it('should normalize null terms to empty strings and filter them', () => {
		const keywords = [
			{ id: 'keyword-test', term: null },
			{ id: 'keyword-test', term: 'Art' },
		];

		const result = normalizeKeywords(keywords);

		expect(result).toStrictEqual([{ id: 'keyword-test', term: 'Art' }]);
	});

	it('should trim whitespace from terms', () => {
		const keywords = [
			{ id: 'keyword-test', term: '  Art  ' },
			{ id: 'keyword-test', term: '\tDesign\t' },
		];

		const result = normalizeKeywords(keywords);

		expect(result).toStrictEqual([
			{ id: 'keyword-test', term: 'Art' },
			{ id: 'keyword-test', term: 'Design' },
		]);
	});

	it('should filter out keywords with empty terms', () => {
		const keywords = [
			{ id: 'keyword-test', term: '' },
			{ id: 'keyword-test', term: '   ' },
			{ id: 'keyword-test', term: 'Art' },
		];

		const result = normalizeKeywords(keywords);

		expect(result).toStrictEqual([{ id: 'keyword-test', term: 'Art' }]);
	});
});

describe('mergeRoles()', () => {
	it('should return empty array when mdRoles is undefined', () => {
		const roles = [{ id: 'role1', labels: { de: 'Autor', en: 'Author' } }];

		expect(mergeRoles(undefined, roles)).toStrictEqual([]);
	});

	it('should return empty array when roles is undefined', () => {
		const mdRoles = [{ role_id: 'role1', person_id: 'person1' }];

		expect(mergeRoles(mdRoles, undefined)).toStrictEqual([]);
	});

	it('should merge md_roles with roles', () => {
		const mdRoles = [
			{ role_id: 'role1', person_id: 'person1' },
			{ role_id: 'role2', person_id: 'person2' },
		];

		const roles = [
			{ id: 'role1', labels: { de: 'Autor', en: 'Author' } },
			{ id: 'role2', labels: { de: 'Fotograf', en: 'Photographer' } },
		];

		const result = mergeRoles(mdRoles, roles);

		expect(result).toHaveLength(2);
		expect(result[0]).toStrictEqual({
			role_id: 'role1',
			person_id: 'person1',
			labels: { de: 'Autor', en: 'Author' },
		});
		expect(result[1]).toStrictEqual({
			role_id: 'role2',
			person_id: 'person2',
			labels: { de: 'Fotograf', en: 'Photographer' },
		});
	});

	it('should filter out md_roles with null role_id', () => {
		const mdRoles = [
			{ role_id: null, person_id: 'person1' },
			{ role_id: 'role2', person_id: 'person2' },
		];

		const roles = [{ id: 'role2', labels: { de: 'Fotograf', en: 'Photographer' } }];

		const result = mergeRoles(mdRoles, roles);

		expect(result).toHaveLength(1);
		expect(result[0]!.role_id).toBe('role2');
	});

	it('should filter out md_roles with null person_id', () => {
		const mdRoles = [
			{ role_id: 'role1', person_id: null },
			{ role_id: 'role2', person_id: 'person2' },
		];

		const roles = [{ id: 'role2', labels: { de: 'Fotograf', en: 'Photographer' } }];

		const result = mergeRoles(mdRoles, roles);

		expect(result).toHaveLength(1);
		expect(result[0]!.person_id).toBe('person2');
	});

	it('should filter out md_roles without matching role definition', () => {
		const mdRoles = [
			{ role_id: 'role1', person_id: 'person1' },
			{ role_id: 'role-nonexistent', person_id: 'person2' },
		];

		const roles = [{ id: 'role1', labels: { de: 'Autor', en: 'Author' } }];

		const result = mergeRoles(mdRoles, roles);

		expect(result).toHaveLength(1);
		expect(result[0]!.role_id).toBe('role1');
	});

	it('should filter out null role entries', () => {
		const mdRoles = [{ role_id: 'role1', person_id: 'person1' }];

		const roles = [
			null,
			{ id: 'role1', labels: { de: 'Autor', en: 'Author' } },
		];

		const result = mergeRoles(mdRoles, roles);

		expect(result).toHaveLength(1);
		expect(result[0]!.role_id).toBe('role1');
	});

	it('should normalize null label values to empty strings', () => {
		const mdRoles = [{ role_id: 'role1', person_id: 'person1' }];

		const roles = [{ id: 'role1', labels: { de: null, en: 'Author' } }];

		const result = mergeRoles(mdRoles, roles);

		expect(result[0]!.labels).toStrictEqual({ de: '', en: 'Author' });
	});

	it('should trim whitespace from label values', () => {
		const mdRoles = [{ role_id: 'role1', person_id: 'person1' }];

		const roles = [{ id: 'role1', labels: { de: '  Autor  ', en: '  Author  ' } }];

		const result = mergeRoles(mdRoles, roles);

		expect(result[0]!.labels).toStrictEqual({ de: 'Autor', en: 'Author' });
	});
});

describe('shouldReturnEmptyString()', () => {
	it('should return true for meta keys configured to return empty string', () => {
		expect(shouldReturnEmptyString('creative_work:description_en')).toBe(true);
		expect(shouldReturnEmptyString('madek_core:description')).toBe(true);
		expect(shouldReturnEmptyString('creative_work:dimension')).toBe(true);
	});

	it('should return false for meta keys not configured', () => {
		expect(shouldReturnEmptyString('madek_core:title')).toBe(false);
		expect(shouldReturnEmptyString('madek_core:authors')).toBe(false);
		expect(shouldReturnEmptyString('unknown:meta_key')).toBe(false);
	});
});

describe('shouldReturnEmptyArray()', () => {
	it('should return true for meta keys configured to return empty array', () => {
		expect(shouldReturnEmptyArray('madek_core:authors')).toBe(true);
		expect(shouldReturnEmptyArray('madek_core:keywords')).toBe(true);
		expect(shouldReturnEmptyArray('creative_work:material')).toBe(true);
	});

	it('should return false for meta keys not configured', () => {
		expect(shouldReturnEmptyArray('madek_core:title')).toBe(false);
		expect(shouldReturnEmptyArray('madek_core:description')).toBe(false);
		expect(shouldReturnEmptyArray('unknown:meta_key')).toBe(false);
	});
});

describe('getFallbackMetaKey()', () => {
	it('should return fallback meta key for configured keys', () => {
		expect(getFallbackMetaKey('creative_work:title_en')).toBe('madek_core:title');
	});

	it('should return undefined for keys without fallback', () => {
		expect(getFallbackMetaKey('madek_core:title')).toBeUndefined();
		expect(getFallbackMetaKey('madek_core:description')).toBeUndefined();
		expect(getFallbackMetaKey('unknown:meta_key')).toBeUndefined();
	});
});
