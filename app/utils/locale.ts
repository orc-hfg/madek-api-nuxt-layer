import type { AppLocale } from '../types/locale';

export function getAlternativeLocale(locale: AppLocale): AppLocale {
	return locale === 'de' ? 'en' : 'de';
}
