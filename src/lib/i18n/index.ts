import { browser } from '$app/environment';
import { init, register, locales as localesStore, locale } from 'svelte-i18n';
import { get } from 'svelte/store';
import { persistedLocale } from '$lib/i18n/persist';
import { i18nConfig } from '$lib/i18n/config';

export const resolveFirstAvailableLocale = (locales: readonly string[]): string => {
	const availableLocales = get(localesStore);

	const persisted = get(persistedLocale);
	if (persisted && availableLocales.includes(persisted)) {
		return persisted;
	}

	for (const locale of locales) {
		// remove part of priority string after ';'
		const localeWithoutPriority = locale.split(';')[0];
		if (availableLocales.includes(localeWithoutPriority)) {
			return localeWithoutPriority;
		}
	}
	return i18nConfig.defaultLocale;
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
	persistedLocale.set(value);
});
