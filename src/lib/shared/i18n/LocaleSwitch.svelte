<script lang="ts">
	import { availableLanguageTags } from '@inlang/paraglide-js/vegas';
	import { parse } from 'bcp-47';

	import { _, localePreference } from '$lib/shared/i18n/index';
	import Select from '$lib/vgui/select/Select.svelte';

	let clazz = '';
	export { clazz as class };

	const getLanguageName = (locale: string): string => {
		return (
			new Intl.DisplayNames([locale], {
				type: 'language'
			}).of(locale) || locale
		);
	};

	const getLanguageFlag = (locale: string): string => {
		const parsed = parse(locale, { forgiving: true });
		return parsed.region ? `flag:${parsed.region.toLowerCase()}-4x3` : 'tabler:language';
	};

	$: options = availableLanguageTags.map((locale) => ({
		value: locale,
		label: getLanguageName(locale),
		icon: getLanguageFlag(locale)
	}));
</script>

<Select class={clazz} bind:value={$localePreference} label={_('locale_switch_label')} {options} />
