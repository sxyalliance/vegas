<script lang="ts">
	import Select from '$lib/shared/shared/components/select/Select.svelte';
	import { availableLanguageTags } from '@inlang/paraglide-js/vegas';
	import { _, localePreference } from '$lib/shared/i18n/index';

	let clazz = '';
	export { clazz as class };

	const labels: Record<string, string> = {
		'en-US': 'English (US)',
		'zh-HK': '繁體中文 (香港)'
	};

	$: options = availableLanguageTags.map((locale) => ({
		value: locale,
		label: labels[locale] ?? locale,
		icon: 'tabler:language'
	}));
</script>

<Select class={clazz} bind:value={$localePreference} label={_('locale_switch_label')} {options} />
