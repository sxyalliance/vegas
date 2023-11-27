<script>
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';

	import ArticleSection from '$lib/shared/shared/components/ArticleSection.svelte';

	import { html } from './content.md';
</script>

<SeoHandler
	metaTags={{
		title: 'Cookie Policy'
	}}
/>

<ArticleSection>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- content from local file -->
	{@html html}
</ArticleSection>
