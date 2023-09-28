import '$lib/i18n'; // Import to initialize. Important :)
import { waitLocale } from 'svelte-i18n';
import { detectAndApplyLocale } from '$lib/i18n';

import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
import type { LayoutLoad } from './$types';

// logger for debugging
import '$lib/logging/init';

// vercel analytics
inject({ mode: dev ? 'development' : 'production' });

export const load: LayoutLoad = async () => {
	// locale detection
	detectAndApplyLocale();
	await waitLocale();
};
