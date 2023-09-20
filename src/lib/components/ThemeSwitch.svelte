<script lang="ts">
	import { AvailablePreferences, themePreference, theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';
	import va from '@vercel/analytics';
	import { _ } from 'svelte-i18n';
	import SelectMenu from '$lib/components/SelectMenu.svelte';

	let clazz = '';
	export { clazz as class };

	const themeIcons: Record<(typeof AvailablePreferences)[number], string> = {
		system: 'tabler:contrast',
		light: 'tabler:sun',
		dark: 'tabler:moon'
	};

	const options = AvailablePreferences.map((preference) => {
		return {
			value: preference,
			label: `theme_switch.${preference}`,
			icon: themeIcons[preference]
		};
	});

	function activateDarkMode() {
		document.documentElement.classList.add('dark-theme');
	}

	function deactivateDarkMode() {
		document.documentElement.classList.remove('dark-theme');
	}

	theme.subscribe((value) => {
		if (!browser) {
			return;
		}

		if (value === 'dark') {
			activateDarkMode();
		} else if (value === 'light') {
			deactivateDarkMode();
		}

		va.track('ChangeTheme', {
			theme: value
		});
	});
</script>

<SelectMenu
	class={clazz}
	bind:value={$themePreference}
	label={$_('theme_switch.sr_label')}
	{options}
/>
