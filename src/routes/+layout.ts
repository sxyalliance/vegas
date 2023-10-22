import type { LayoutLoad } from './$types';

// logger for debugging
import '$lib/shared/logging/init';

import '$lib/shared/shared/dayjs';
import { QueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';
import { detectAndApplyLocale } from '$lib/shared/i18n';

export const load: LayoutLoad = async () => {
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

	return { queryClient };
};
