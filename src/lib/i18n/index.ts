import { browser } from '$app/environment';
import { init, register, locales as localesStore, locale } from 'svelte-i18n';
import { get } from 'svelte/store';
import { persistedLocale } from '$lib/i18n/persist';
import { i18nConfig } from '$lib/i18n/config';
import { getLogger } from '$lib/utils/logging/logger';
import { preferredLanguages } from 'svelte-legos';

const logger = getLogger('i18n');

export const resolveFirstAvailableLocale = (locales: readonly string[]): string => {
	const availableLocales = get(localesStore);

	const persisted = get(persistedLocale);
	if (persisted && availableLocales.includes(persisted)) {
		logger.debug({ persisted }, 'Locale has been resolved from persisted value');
		return persisted;
	}

	logger.debug('Resolving locale from browser languages');
	for (const locale of locales) {
		// remove part of priority string after ';'
		const localeWithoutPriority = locale.split(';')[0];
		if (availableLocales.includes(localeWithoutPriority)) {
			return localeWithoutPriority;
		}
	}

	logger.debug({ default: i18nConfig.defaultLocale }, 'Locale has been fallback to default');
	return i18nConfig.defaultLocale;
};

export const detectAndApplyLocale = () => {
	if (!browser) {
		return;
	}

	locale.set(resolveFirstAvailableLocale(get(preferredLanguages())));
};

i18nConfig.enabledLocales.forEach((locale) => {
	register(locale, () => import(`./locales/${locale}.json`));
});

init({
	fallbackLocale: i18nConfig.defaultLocale,
	initialLocale: browser
		? resolveFirstAvailableLocale(window.navigator.languages)
		: i18nConfig.defaultLocale
});

locale.subscribe((value) => {
	if (!value) {
		return;
	}
	logger.info({ locale: value }, 'Locale has been changed');
	persistedLocale.set(value);
	logger.debug({ locale: value }, 'Locale has been persisted');
});
