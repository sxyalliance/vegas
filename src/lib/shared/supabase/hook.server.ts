import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import {
	combineChunks,
	createChunks,
	createServerClient,
	deleteChunks,
	parse
} from '@supabase/ssr';

import type { Handle } from '@sveltejs/kit';

export default (async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => combineChunks(key, (name) => event.cookies.get(name)),
			set: (key, value, options) => {
				const chunks = createChunks(key, value, 2048);
				for (const chunk of chunks) {
					event.cookies.set(chunk.name, chunk.value, options);
				}
			},
			remove: (key, options) => {
				deleteChunks(
					key,
					(name) => event.cookies.get(name),
					(name) => event.cookies.set(name, '', options)
				);
			}
		}
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event);
}) satisfies Handle;
