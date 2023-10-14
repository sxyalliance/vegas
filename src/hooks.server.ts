import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';
import { resolveFirstAvailableLocale } from '$lib/i18n';
import { constructDirectus } from '$lib/shared/shared/directus';

export const handle: Handle = async ({ event, resolve }) => {
	const langs = event.request.headers.get('accept-language')?.split(',');
	if (langs) {
		locale.set(resolveFirstAvailableLocale(langs));
	}

	event.locals.directus = constructDirectus(event.fetch);

	return resolve(event);
};
