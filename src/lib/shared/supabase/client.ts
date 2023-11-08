import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { combineChunks, createBrowserClient as iCBC, isBrowser, parse } from '@supabase/ssr';

import type { Database } from './database.types';

export type SupabaseBrowserClient = ReturnType<typeof createBrowserClient>;

export const createBrowserClient = (customFetch: typeof window.fetch = fetch, session: unknown) => {
	return iCBC<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch: customFetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(session);
				}

				return combineChunks(key, (name) => {
					const cookies = parse(document.cookie);
					return cookies[name];
				});
			}
		}
	});
};
