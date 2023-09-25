import { storable } from '$lib/stores/storable';
import { i18nConfig } from '$lib/i18n/config';

function createPersistedLocale() {
	const { subscribe, set } = storable<string | null | undefined>(
		i18nConfig.defaultLocale,
		'locale'
	);

	return {
		subscribe,
		set
	};
}

export const persistedLocale = createPersistedLocale();
