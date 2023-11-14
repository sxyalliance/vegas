<script lang="ts">
	import { browser } from '$app/environment';

	import Icon from '@iconify/svelte';

	import * as m from '$lib/shared/i18n/compiled/messages';
	import { themePreference, theme } from '$lib/shared/theme/store';

	import { Button } from '$lib/vgui/components/ui/button';
	import * as DropdownMenu from '$lib/vgui/components/ui/dropdown-menu';

	let clazz = '';
	export { clazz as class };

	theme.subscribe((value: string) => {
		if (!browser) {
			return;
		}

		document.documentElement.dataset.theme = value;
	});

	const availableThemePreferences = [
		{
			name: 'system',
			label: m.theme_switch_system(),
			icon: 'lucide:contrast'
		},
		{
			name: 'light',
			label: m.theme_switch_light(),
			icon: 'lucide:sun'
		},
		{
			name: 'dark',
			label: m.theme_switch_dark(),
			icon: 'lucide:moon'
		}
	];
</script>

<DropdownMenu.Root positioning={{ placement: 'bottom-end' }}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon" class={clazz}>
			{#each availableThemePreferences as themePreferenceC (themePreferenceC.icon)}
				{#if themePreferenceC.name === $theme}
					<Icon icon={themePreferenceC.icon} class="h-5 w-5" />
				{/if}
			{/each}
			<span class="sr-only">{m.theme_switch_label()}</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#each availableThemePreferences as themePreferenceC (themePreferenceC.name)}
			<DropdownMenu.Item on:click={() => themePreference.set(themePreferenceC.name)}>
				<Icon icon={themePreferenceC.icon} class="mr-3 h-4 w-4" />
				{themePreferenceC.label}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
