import type { Handle } from '@sveltejs/kit';
import { constructDirectus } from '$lib/shared/directus/client';

export const handle: Handle = async ({ event, resolve }) => {
	const langs = event.request.headers.get('accept-language')?.split(',');
	if (langs) {
		// locale.set('en-US');
	}

	event.locals.directus = constructDirectus(event.fetch);

	return resolve(event, {
		filterSerializedResponseHeaders: (name) => !name.startsWith('x-')
	});
};
