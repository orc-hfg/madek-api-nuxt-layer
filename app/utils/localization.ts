import type { AppLocale } from '../types/locale';

export function getAlternativeLocale(locale: AppLocale): AppLocale {
	return locale === 'de' ? 'en' : 'de';
}

export function getLocalizedLabel(labels: LocalizedLabel, appLocale: AppLocale, entityType: string, entityId: string, logger: Logger): string {
	const primaryLabel = labels[appLocale];

	if (isNonEmptyString(primaryLabel)) {
		return primaryLabel;
	}

	const fallbackLocale = getAlternativeLocale(appLocale);
	const fallbackLabel = labels[fallbackLocale];

	if (isNonEmptyString(fallbackLabel)) {
		logger.warn(`${entityType} ${entityId}: Label for locale '${appLocale}' is empty, using fallback locale '${fallbackLocale}'.`);

		return fallbackLabel;
	}

	logger.warn(`${entityType} ${entityId}: No label found for any locale, returning empty string.`);

	return '';
}
