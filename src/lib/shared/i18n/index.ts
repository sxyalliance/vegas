import { persistCookie } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';
import {
	setLanguageTag,
	type AvailableLanguageTag,
	sourceLanguageTag
} from '@inlang/paraglide-js/vegas';
import * as m from '@inlang/paraglide-js/vegas/messages';

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
		if (strict) {
			throw new Error(`Message id ${id} not found`);
		} else {
			return id;
		}
	}

	return m[id]();
}

export const mgs = m;
