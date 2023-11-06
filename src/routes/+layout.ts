// logger for debugging
import '$lib/shared/logging/init';

import '$lib/shared/shared/dayjs';

import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';

import { detectAndApplyLocale } from '$lib/shared/i18n';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
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

	return {
		queryClient,
		user: data.user
	};
};
