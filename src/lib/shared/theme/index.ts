import { browser } from '$app/environment';
import { derived, get } from 'svelte/store';
import { preferredColorScheme } from 'svelte-legos';

import { dayTheme, nightTheme, ThemeMode, themeMode } from '$lib/shared/theme/preferences';

export const currentTheme = derived([themeMode, dayTheme, nightTheme], ([$mode, $day, $night]) => {
	const theme = (() => {
		switch ($mode) {
			case ThemeMode.Single:
				return $day;
			case ThemeMode.Auto:
				return get(preferredColorScheme()) === 'dark' ? $night : $day;
		}
	})();

	if (browser) {
		document.documentElement.dataset.theme = theme;
	}

	return theme;
});
