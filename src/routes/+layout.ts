import '$lib/i18n'; // Import to initialize. Important :)
import { waitLocale } from 'svelte-i18n';
import { detectAndApplyLocale } from '$lib/i18n';

import type { LayoutLoad } from './$types';

// logger for debugging
import '$lib/logging/init';

import '$lib/shared/dayjs';

export const load: LayoutLoad = async () => {
	// locale detection
	detectAndApplyLocale();
	await waitLocale();
};
