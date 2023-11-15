import { persistBrowserLocal } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export enum ThemeMode {
	Single = 'single',
	Auto = 'auto'
}

export const themeMode = persistBrowserLocal(writable<ThemeMode>(ThemeMode.Single), 'themeMode');

export enum Theme {
	Light = 'light',
	Dark = 'dark'
}

export const dayTheme = persistBrowserLocal(writable<Theme>(Theme.Light), 'dayTheme');

export const nightTheme = persistBrowserLocal(writable<Theme>(Theme.Dark), 'nightTheme');
