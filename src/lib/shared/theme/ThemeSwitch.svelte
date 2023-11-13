<script lang="ts">
	import { browser } from '$app/environment';

	import * as m from '$lib/shared/i18n/compiled/messages';
	import { AvailablePreferences, themePreference, theme } from '$lib/shared/theme/store';

	import Select from '$lib/vgui/select/Select.svelte';

	let clazz = '';
	export { clazz as class };

	const themeIcons: Record<(typeof AvailablePreferences)[number], string> = {
		system: 'tabler:contrast',
		light: 'tabler:sun',
		dark: 'tabler:moon'
	};

	const options = AvailablePreferences.map((preference: string) => {
		return {
			value: preference,
			label: m[`theme_switch_${preference}`](),
			icon: themeIcons[preference]
		};
	});

	function activateDarkMode() {
		document.documentElement.classList.add('dark');
	}

	function deactivateDarkMode() {
		document.documentElement.classList.remove('dark');
	}

	theme.subscribe((value: string) => {
		if (!browser) {
			return;
		}

		if (value === 'dark') {
			activateDarkMode();
		} else if (value === 'light') {
			deactivateDarkMode();
		}
	});
</script>

<Select class={clazz} bind:value={$themePreference} label={m.theme_switch_label()} {options} />
