import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n';
import { resolveFirstAvailableLocale } from '$lib/i18n';

import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
inject({ mode: dev ? 'development' : 'production' });

export const load = async () => {
	if (browser) {
		locale.set(resolveFirstAvailableLocale(window.navigator.languages));
	}
	await waitLocale();
};
