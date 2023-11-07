<script>
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';

	import Content from './cookie_content.md';
</script>

<SeoHandler
	metaTags={{
		title: 'Cookie Policy'
	}}
/>

<section class="bg-neutral-1 px-6 py-32 lg:px-8">
	<article class="prose-here prose mx-auto max-w-3xl">
		<Content />
	</article>
</section>
