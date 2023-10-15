import '$lib/i18n'; // Import to initialize. Important :)
import { waitLocale } from 'svelte-i18n';
import { detectAndApplyLocale } from '$lib/i18n';

import type { LayoutLoad } from './$types';

// logger for debugging
import '$lib/shared/logging/init';

import '$lib/shared/shared/dayjs';
import { QueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';

export const load: LayoutLoad = async () => {
	// locale detection
	detectAndApplyLocale();
	await waitLocale();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: 1000
			}
		}
	});

	return { queryClient };
};
