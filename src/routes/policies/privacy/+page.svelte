<script>
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';

	import { html } from './content.md';
</script>

<SeoHandler
	metaTags={{
		title: 'Privacy Policy'
	}}
/>

<section class="bg-neutral-1 px-6 py-32 lg:px-8">
	<article class="prose-here prose mx-auto max-w-3xl">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- content from local file -->
		{@html html}
	</article>
</section>
