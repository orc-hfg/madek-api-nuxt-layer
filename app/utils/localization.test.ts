import { beforeEach, describe, expect, it } from 'vitest';
import { setupDirectLoggerMock } from '../../tests/mocks/logger';
import { getAlternativeLocale, getLocalizedLabel } from './localization';

describe('getAlternativeLocale()', () => {
	it('should return "en" when given "de"', () => {
		expect(getAlternativeLocale('de')).toBe('en');
	});

	it('should return "de" when given "en"', () => {
		expect(getAlternativeLocale('en')).toBe('de');
	});
});

describe('getLocalizedLabel()', () => {
	let mockLogger: ReturnType<typeof setupDirectLoggerMock>['mockLogger'];
	let loggerWarnSpy: ReturnType<typeof setupDirectLoggerMock>['loggerWarnSpy'];

	beforeEach(() => {
		const { mockLogger: logger, loggerWarnSpy: warnSpy } = setupDirectLoggerMock();
		mockLogger = logger;
		loggerWarnSpy = warnSpy;
	});

	describe('primary label exists', () => {
		it('should return primary label when it exists in German', () => {
			const labels = { de: 'Deutscher Titel', en: 'English Title' };
			const result = getLocalizedLabel(labels, 'de', 'Collection', '123', mockLogger);

			expect(result).toBe('Deutscher Titel');
			expect(loggerWarnSpy).not.toHaveBeenCalled();
		});

		it('should return primary label when it exists in English', () => {
			const labels = { de: 'Deutscher Titel', en: 'English Title' };
			const result = getLocalizedLabel(labels, 'en', 'Collection', '123', mockLogger);

			expect(result).toBe('English Title');
			expect(loggerWarnSpy).not.toHaveBeenCalled();
		});
	});

	describe('fallback to alternative locale', () => {
		it('should use fallback locale when primary label is empty string', () => {
			const labels = { de: '', en: 'English Title' };
			const result = getLocalizedLabel(labels, 'de', 'Collection', '123', mockLogger);

			expect(result).toBe('English Title');
			expect(loggerWarnSpy).toHaveBeenCalledWith(
				'Collection 123: Label for locale \'de\' is empty, using fallback locale \'en\'.',
			);
		});

		it('should use fallback locale when primary label is null', () => {
			const labels = { de: null as unknown as string, en: 'English Title' };
			const result = getLocalizedLabel(labels, 'de', 'Collection', '123', mockLogger);

			expect(result).toBe('English Title');
			expect(loggerWarnSpy).toHaveBeenCalledWith(
				'Collection 123: Label for locale \'de\' is empty, using fallback locale \'en\'.',
			);
		});

		it('should use fallback locale when primary label is undefined', () => {
			const labels = { de: undefined as unknown as string, en: 'English Title' };
			const result = getLocalizedLabel(labels, 'de', 'Collection', '123', mockLogger);

			expect(result).toBe('English Title');
			expect(loggerWarnSpy).toHaveBeenCalledWith(
				'Collection 123: Label for locale \'de\' is empty, using fallback locale \'en\'.',
			);
		});

		it('should use fallback locale when primary label is whitespace-only', () => {
			const labels = { de: '   ', en: 'English Title' };
			const result = getLocalizedLabel(labels, 'de', 'Collection', '123', mockLogger);

			expect(result).toBe('English Title');
			expect(loggerWarnSpy).toHaveBeenCalledWith(
				'Collection 123: Label for locale \'de\' is empty, using fallback locale \'en\'.',
			);
		});

		it('should use German fallback when English is primary but empty', () => {
			const labels = { de: 'Deutscher Titel', en: '' };
			const result = getLocalizedLabel(labels, 'en', 'MediaEntry', '456', mockLogger);

			expect(result).toBe('Deutscher Titel');
			expect(loggerWarnSpy).toHaveBeenCalledWith(
				'MediaEntry 456: Label for locale \'en\' is empty, using fallback locale \'de\'.',
			);
		});
	});

	describe('no labels available', () => {
		it('should return empty string and warn when both labels are empty', () => {
			const labels = { de: '', en: '' };
			const result = getLocalizedLabel(labels, 'de', 'Collection', '789', mockLogger);

			expect(result).toBe('');
			expect(loggerWarnSpy).toHaveBeenCalledWith(
				'Collection 789: No label found for any locale, returning empty string.',
			);
		});

		it('should return empty string and warn when both labels are null', () => {
			const labels = { de: null as unknown as string, en: null as unknown as string };
			const result = getLocalizedLabel(labels, 'de', 'Collection', '789', mockLogger);

			expect(result).toBe('');
			expect(loggerWarnSpy).toHaveBeenCalledWith(
				'Collection 789: No label found for any locale, returning empty string.',
			);
		});

		it('should return empty string and warn when both labels are whitespace-only', () => {
			const labels = { de: '  ', en: '\t' };
			const result = getLocalizedLabel(labels, 'en', 'Set', '999', mockLogger);

			expect(result).toBe('');
			expect(loggerWarnSpy).toHaveBeenCalledWith(
				'Set 999: No label found for any locale, returning empty string.',
			);
		});
	});

	describe('entity type and ID in warning messages', () => {
		it('should include correct entity type and ID in warning messages', () => {
			const labels = { de: '', en: '' };

			getLocalizedLabel(labels, 'de', 'MediaEntry', 'abc-123', mockLogger);

			expect(loggerWarnSpy).toHaveBeenCalledWith(
				'MediaEntry abc-123: No label found for any locale, returning empty string.',
			);

			getLocalizedLabel(labels, 'en', 'Set', 'xyz-789', mockLogger);

			expect(loggerWarnSpy).toHaveBeenCalledWith(
				'Set xyz-789: No label found for any locale, returning empty string.',
			);
		});
	});
});
