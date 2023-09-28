<script lang="ts">
	import { _, locales, locale } from 'svelte-i18n';
	import SelectMenu from '$lib/shared/SelectMenu.svelte';

	let clazz = '';
	export { clazz as class };

	const labels = {
		en: 'English',
		'zh-HK': '繁體中文 (香港)'
	};

	$: options = $locales.map((locale) => ({
		value: locale,
		label: locale,
		icon: 'tabler:language'
	}));
</script>

<SelectMenu
	class={clazz}
	bind:value={$locale}
	label={$_('locale_switch.sr_label')}
	{options}
	alternativeLabelMap={labels}
/>
