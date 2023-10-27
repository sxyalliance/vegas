<script lang="ts">
	import { JsonLd, type JsonLdProps, MetaTags, type MetaTagsProps } from 'svelte-meta-tags';

	export let metaTags: MetaTagsProps = {};

	export let jsonLd: JsonLdProps['schema'] = undefined;

	const defaultMetaTags: MetaTagsProps = {
		titleTemplate: '%s • SXYA Community',
		title: 'SXYA Community'
	};

	$: mergedMetaTags = { ...defaultMetaTags, ...metaTags };
</script>

<MetaTags {...mergedMetaTags} />

{#if !!jsonLd}
	<JsonLd schema={jsonLd} />
{/if}
