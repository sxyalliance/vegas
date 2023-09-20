import { storable } from './storable';
import { derived } from 'svelte/store';
import { browser } from '$app/environment';

export const AvailableThemes = ['light', 'dark'] as const;
export const AvailablePreferences = ['system', ...AvailableThemes] as const;
export const DefaultPreference = 'system' as const;
export const FallbackTheme = 'light' as const;

type ThemePreference = (typeof AvailablePreferences)[number];

function createThemePreference() {
	const { subscribe, set } = storable<ThemePreference>(DefaultPreference);

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
				return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			}
			return FallbackTheme;
		}
		return $themePreference;
	});

	return {
		subscribe
	};
}

export const theme = createTheme();
