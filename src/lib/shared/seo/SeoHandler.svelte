<script lang="ts">
	import { JsonLd, type JsonLdProps, MetaTags, type MetaTagsProps } from 'svelte-meta-tags';

	import type { SeoDataProvider } from '$lib/shared/seo/factory/base';

	export let factory: SeoDataProvider | undefined = undefined;

	export let metaTags: MetaTagsProps = {};

	export let jsonLd: JsonLdProps['schema'] = undefined;

	if (factory) {
		metaTags = factory.getMetaTags();
		jsonLd = factory.getJsonLd();
	}
</script>

<MetaTags {...metaTags} />

{#if !!jsonLd}
	<JsonLd schema={jsonLd} />
{/if}
