import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';
import { resolveFirstAvailableLocale } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const langs = event.request.headers.get('accept-language')?.split(',');
	if (langs) {
		locale.set(resolveFirstAvailableLocale(langs));
	}

	return resolve(event);
};
