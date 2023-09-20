<script>
  import {_, locales, locale} from "svelte-i18n";
  import SelectMenu from "$lib/components/SelectMenu.svelte";

  const labels = {
    'en': 'English',
    'zh-HK': '繁體中文 (香港)',
  }

  $: options = $locales.map((locale) => ({
    value: locale,
    label: locale,
    icon: 'tabler:language',
  }));
</script>

<SelectMenu class="w-46" bind:value={$locale} label={$_('locale_switch.sr_label')} {options} alternativeLabelMap={labels}/>
