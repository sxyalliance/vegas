import { persistCookie } from '@macfja/svelte-persistent-store';
import { get, writable } from 'svelte/store';
import {
	setLanguageTag,
	type AvailableLanguageTag,
	sourceLanguageTag,
	availableLanguageTags
} from '@inlang/paraglide-js/vegas';
import * as m from '@inlang/paraglide-js/vegas/messages';
import { browser, dev } from '$app/environment';
import { preferredLanguages } from 'svelte-legos';
import { getLogger } from '$lib/shared/logging/logger';

const logger = getLogger('i18n');

function createLocalePreference() {
	const { subscribe, set } = persistCookie(
		writable<AvailableLanguageTag | undefined>(sourceLanguageTag),
		'i18n-locale'
	);

	subscribe((v) => {
		if (v) {
			setLanguageTag(v);
		}
		if (v === undefined) {
			setLanguageTag(sourceLanguageTag);
		}
	});

	return {
		subscribe,
		set
	};
}

export const localePreference = createLocalePreference();

export type MessageId = keyof typeof m;

export function _(id: MessageId, strict: boolean = true): string {
	if (!m[id]) {
		if (strict && !dev) {
			throw new Error(`Message id ${id} not found`);
		} else {
			logger.warn({ id }, `Message of the specified id not found, returning id as message`);
			return id;
		}
	}

	return m[id]();
}

export const resolveFirstAvailableLocale = (locales: readonly string[]): AvailableLanguageTag => {
	const persisted = get(localePreference);
	if (persisted && availableLanguageTags.includes(persisted)) {
		return persisted;
	}

	for (const locale of locales) {
		// remove part of priority string after ';'
		const localeWithoutPriority = locale.split(';')[0] as AvailableLanguageTag;
		if (availableLanguageTags.includes(localeWithoutPriority)) {
			return localeWithoutPriority;
		}
	}

	return sourceLanguageTag;
};

export const detectAndApplyLocale = () => {
	if (!browser) {
		return;
	}

	localePreference.set(resolveFirstAvailableLocale(get(preferredLanguages())));
};
