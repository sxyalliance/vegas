// logger for debugging
import '$lib/shared/logging/init';

import '$lib/shared/shared/dayjs';

import { browser } from '$app/environment';
import { combineChunks, createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import { QueryClient } from '@tanstack/svelte-query';


import { detectAndApplyLocale } from '$lib/shared/i18n';

import type { LayoutLoad } from './$types';

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	// locale detection
	detectAndApplyLocale();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: 60 * 1000
			}
		}
	});

	depends('supabase:auth');

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(data.session);
				}

				const cookie = combineChunks(key, (name) => {
					const cookies = parse(document.cookie);
					return cookies[name];
				});
				return cookie;
			}
		}
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return {
		queryClient,
		supabase,
		session
	};
};
