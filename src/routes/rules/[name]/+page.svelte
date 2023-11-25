<script lang="ts">
	import ArticleSection from '$lib/shared/shared/components/ArticleSection.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ArticleSection>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- content from local file -->
	{@html data.html}
</ArticleSection>
