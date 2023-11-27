import type { MessageId } from '$lib/shared/shared/i18n_utils';
import { Theme, ThemeMode } from '$lib/shared/theme/preferences';

export const availableThemeModes: {
	value: ThemeMode;
	label: MessageId;
	description: MessageId;
}[] = [
	{
		value: ThemeMode.Single,
		label: 'theme_mode_single_label',
		description: 'theme_mode_single_description'
	},
	{
		value: ThemeMode.Auto,
		label: 'theme_mode_auto_label',
		description: 'theme_mode_auto_description'
	}
];

export const availableThemes: {
	value: Theme;
	label: MessageId;
}[] = [
	{
		value: Theme.Light,
		label: 'theme_theme_light'
	},
	{
		value: Theme.Dark,
		label: 'theme_theme_dark'
	}
];
