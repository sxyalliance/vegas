<script lang="ts">
	import * as m from '$i18n/messages';
	import { availableThemeModes, availableThemes } from '$lib/shared/theme/options';
	import { dayTheme, nightTheme, Theme, ThemeMode, themeMode } from '$lib/shared/theme/preferences';
	import { Label } from '$lib/vgui/components/ui/label';
	import * as Select from '$lib/vgui/components/ui/select';

	import type { SelectOption } from '@melt-ui/svelte';

	$: currentModeOption =
		availableThemeModes.find((v) => v.value === $themeMode) || availableThemeModes[0];
	$: dayThemeOption = availableThemes.find((v) => v.value === $dayTheme) || availableThemes[0];
	$: nightThemeOption = availableThemes.find((v) => v.value === $nightTheme) || availableThemes[-1];

	const handleModeSelectedChange = (v: SelectOption<unknown> | undefined) => {
		if (v) {
			themeMode.set(v.value as ThemeMode);
		}
	};

	const handleDayThemeSelectedChange = (v: SelectOption<unknown> | undefined) => {
		if (v) {
			dayTheme.set(v.value as Theme);
		}
	};

	const handleNightThemeSelectedChange = (v: SelectOption<unknown> | undefined) => {
		if (v) {
			nightTheme.set(v.value as Theme);
		}
	};
</script>

<div class="space-y-4">
	<div class="space-y-2">
		<Label>{m.theme_mode_label()}</Label>
		<Select.Root
			portal={null}
			onSelectedChange={handleModeSelectedChange}
			selected={{ value: currentModeOption.value, label: m[currentModeOption.label]() }}
		>
			<Select.Trigger>
				<Select.Value asChild>
					<div>
						{m[currentModeOption.label]()}
						<span class="ml-2 text-muted-foreground">
							{m[currentModeOption.description]()}
						</span>
					</div>
				</Select.Value>
			</Select.Trigger>
			<Select.Content>
				{#each availableThemeModes as mode (mode.value)}
					<Select.Item value={mode.value} label={m[mode.label]()} class="flex justify-between">
						{m[mode.label]()}
						<span class="text-muted-foreground">
							{m[mode.description]()}
						</span>
					</Select.Item>
				{/each}
			</Select.Content>
			<Select.Input name="theme_mode" />
		</Select.Root>
	</div>

	<div class="grid grid-cols-1 gap-x-4" class:md:grid-cols-2={$themeMode === 'auto'}>
		<div class="space-y-2">
			{#if $themeMode === 'auto'}
				<Label>{m.theme_day_theme()}</Label>
			{/if}
			<Select.Root
				portal={null}
				onSelectedChange={handleDayThemeSelectedChange}
				selected={{ value: dayThemeOption.value, label: m[dayThemeOption.label]() }}
			>
				<Select.Trigger>
					<Select.Value />
				</Select.Trigger>
				<Select.Content>
					{#each availableThemes as theme (theme.value)}
						<Select.Item value={theme.value} label={m[theme.label]()}
							>{m[theme.label]()}</Select.Item
						>
					{/each}
				</Select.Content>
				<Select.Input name="day_theme" />
			</Select.Root>
		</div>

		{#if $themeMode === 'auto'}
			<div class="space-y-2">
				<Label>{m.theme_night_theme()}</Label>
				<Select.Root
					portal={null}
					onSelectedChange={handleNightThemeSelectedChange}
					selected={{ value: nightThemeOption.value, label: m[nightThemeOption.label]() }}
				>
					<Select.Trigger>
						<Select.Value />
					</Select.Trigger>
					<Select.Content>
						{#each availableThemes as theme (theme.value)}
							<Select.Item value={theme.value} label={m[theme.label]()}
								>{m[theme.label]()}</Select.Item
							>
						{/each}
					</Select.Content>
					<Select.Input name="night_theme" />
				</Select.Root>
			</div>
		{/if}
	</div>
</div>
