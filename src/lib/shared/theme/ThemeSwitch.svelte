<script lang="ts">
	import { AvailablePreferences, themePreference, theme } from '$lib/shared/theme/store';
	import { browser } from '$app/environment';
	import Select from '$lib/vgui/select/Select.svelte';
	import { _ } from '$lib/shared/i18n';

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
			label: _(`theme_switch_${preference}`),
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

<Select class={clazz} bind:value={$themePreference} label={_('theme_switch_label')} {options} />
