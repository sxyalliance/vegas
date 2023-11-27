<script lang="ts">
	import Icon from '@iconify/svelte';
	import { parse } from 'bcp-47';

	import * as m from '$i18n/messages';
	import { setLanguageTag, languageTag, availableLanguageTags } from '$i18n/runtime';
	import type { AvailableLanguageTag } from '$i18n/runtime';
	import { Label } from '$lib/vgui/components/ui/label';
	import * as Select from '$lib/vgui/components/ui/select';

	import type { SelectOption } from '@melt-ui/svelte';

	const getLanguageName = (locale: string): string => {
		return (
			new Intl.DisplayNames([locale], {
				type: 'language'
			}).of(locale) || locale
		);
	};

	const getLanguageFlag = (locale: string): string => {
		const parsed = parse(locale, { forgiving: true });
		return parsed.region ? `flag:${parsed.region.toLowerCase()}-1x1` : 'tabler:language';
	};

	const handleLanguageSelectedChange = (v: SelectOption<unknown> | undefined) => {
		if (v) {
			setLanguageTag(v.value as AvailableLanguageTag);
		}
	};
</script>

<div class="space-y-4">
	<div class="space-y-2">
		<Label>{m.locale_language()}</Label>
		<Select.Root
			portal={null}
			onSelectedChange={handleLanguageSelectedChange}
			selected={{ value: languageTag(), label: getLanguageName(languageTag()) }}
		>
			<Select.Trigger>
				<Select.Value asChild>
					<div class="flex gap-x-3">
						<Icon icon={getLanguageFlag(languageTag())} class="h-5 w-5" />
						{getLanguageName(languageTag())}
					</div>
				</Select.Value>
			</Select.Trigger>
			<Select.Content>
				{#each availableLanguageTags as language}
					<Select.Item value={language} label={getLanguageName(language)} class="flex gap-x-3">
						<Icon icon={getLanguageFlag(language)} class="h-5 w-5" />
						{getLanguageName(language)}
					</Select.Item>
				{/each}
			</Select.Content>
			<Select.Input name="language" />
		</Select.Root>
	</div>
</div>
