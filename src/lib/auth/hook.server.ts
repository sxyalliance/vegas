import { redirect } from 'sveltekit-flash-message/server';

import { authenticatedRoutes } from './authenticated_routes';

import type { Handle } from '@sveltejs/kit';

export default (async ({ event, resolve }) => {
	// check url against list of routes that require authentication
	if (authenticatedRoutes.includes(event.url.pathname)) {
		// check if user is logged in
		const session = await event.locals.getSession();
		if (!session) {
			// user is not logged in, redirect to login page
			throw redirect(
				303,
				'/auth',
				{ type: 'error', message: 'You must be logged in to view this page.' },
				event
			);
		}
	}

	return resolve(event);
}) satisfies Handle;
