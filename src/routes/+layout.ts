import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n';
import { resolveFirstAvailableLocale } from '$lib/i18n';

import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
import { initAndRegisterClient } from '$lib/notion';
import type { LayoutLoad } from './$types';

// logger for debugging
import '$lib/logging/init';

// vercel analytics
inject({ mode: dev ? 'development' : 'production' });

// notion integration
initAndRegisterClient(
	{
		integrationSecret: 'secret_SSIPpymveUd3gSYyFQarQFzNVWNfoHq56cN9AfDyKXe',
		databaseId: '2342ff8d6c2b4654a29ed5994435fcd0'
	},
	'events'
);

export const load: LayoutLoad = async () => {
	// locale detection
	if (browser) {
		locale.set(resolveFirstAvailableLocale(window.navigator.languages));
	}
	await waitLocale();
};
