import { derived, get, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { persistBrowserLocal } from '@macfja/svelte-persistent-store';
import { getLogger } from '$lib/logging/logger';
import { preferredDark } from 'svelte-legos';

export const AvailableThemes = ['light', 'dark'] as const;
export const AvailablePreferences = ['system', ...AvailableThemes] as const;
export const DefaultPreference = 'system' as const;
export const FallbackTheme = 'light' as const;

type ThemePreference = (typeof AvailablePreferences)[number];

const logger = getLogger('theme');

function createThemePreference() {
	const { subscribe, set } = persistBrowserLocal(
		writable<ThemePreference>(DefaultPreference),
		'theme'
	);

	return {
		subscribe,
		set: (n: ThemePreference) => {
			if (AvailablePreferences.includes(n)) {
				set(n);
			}
		}
	};
}

export const themePreference = createThemePreference();

function createTheme() {
	const { subscribe } = derived(themePreference, ($themePreference) => {
		if ($themePreference === 'system') {
			if (browser) {
				logger.debug('Detecting color scheme because theme preference is "system".');
				return get(preferredDark()) ? 'dark' : 'light';
			}
			logger.debug(
				{ fallback: FallbackTheme },
				'Theme preference is "system" but not in browser, falling back.'
			);
			return FallbackTheme;
		}
		logger.debug({ theme: $themePreference }, 'Using explicit theme preference.');
		return $themePreference;
	});

	subscribe((theme) => {
		logger.info({ theme }, 'Theme has been changed.');
	});

	return {
		subscribe
	};
}

export const theme = createTheme();
