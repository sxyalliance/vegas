<script>
	import Content from './content.md';
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';
</script>

<SeoHandler
	metaTags={{
		title: 'Privacy Policy'
	}}
/>

<section class="bg-neutral-1 px-6 py-32 lg:px-8">
	<article class="prose-here prose mx-auto max-w-3xl">
		<Content />
	</article>
</section>
