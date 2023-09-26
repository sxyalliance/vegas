import { i18nConfig } from '$lib/i18n/config';
import { writable } from 'svelte/store';
import { persistBrowserLocal } from '@macfja/svelte-persistent-store';

function createPersistedLocale() {
	const { subscribe, set } = persistBrowserLocal(
		writable<string | null | undefined>(i18nConfig.defaultLocale),
		'locale'
	);

	return {
		subscribe,
		set
	};
}

export const persistedLocale = createPersistedLocale();
