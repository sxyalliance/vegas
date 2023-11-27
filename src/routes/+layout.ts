// logger for debugging
import '$lib/shared/logging/init';

import '$lib/shared/shared/dayjs';

import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';

import { createBrowserClient } from '$lib/shared/supabase/client';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: 60 * 1000
			}
		}
	});

	depends('supabase:auth');

	const supabase = createBrowserClient(fetch, data.session);

	return {
		queryClient,
		supabase,
		session: data.session
	};
};
