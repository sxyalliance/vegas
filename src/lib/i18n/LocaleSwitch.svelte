<script lang="ts">
	import { _, locales, locale } from 'svelte-i18n';
	import Select from '$lib/shared/shared/components/select/Select.svelte';

	let clazz = '';
	export { clazz as class };

	const labels: Record<string, string> = {
		en: 'English',
		'zh-HK': '繁體中文 (香港)'
	};

	$: options = $locales.map((locale) => ({
		value: locale,
		label: labels[locale],
		icon: 'tabler:language'
	}));

	locale.subscribe((value) => {
		if (typeof value !== 'string') return;
		document.documentElement.lang = value;
	});
</script>

<Select class={clazz} bind:value={$locale} label={$_('locale_switch.sr_label')} {options} />
