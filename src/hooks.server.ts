import type { Handle } from '@sveltejs/kit';
import { constructDirectus } from '$lib/shared/directus/client';
import { localePreference, resolveFirstAvailableLocale } from '$lib/shared/i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const langs = event.request.headers.get('accept-language')?.split(',');
	if (langs) {
		localePreference.set(resolveFirstAvailableLocale(langs));
	}

	event.locals.directus = constructDirectus(event.fetch);

	return resolve(event, {
		filterSerializedResponseHeaders: (name) => !name.startsWith('x-')
	});
};
