<script lang="ts">
	import Header from '$lib/shared/layout/header/Header.svelte';
	import Footer from '$lib/shared/layout/Footer.svelte';
	import { browser } from '$app/environment';
	import { navigating, page } from '$app/stores';
	import { webVitals } from '$lib/shared/analytics/vitals';
	import { title } from '$lib/shared/shared/title';
	import type { PageData } from './$types';

	import '$lib/assets/app.css';
	import '$lib/assets/rainbow.css';
	import { onMount } from 'svelte';
	import BrowserSupportNotice from '$lib/shared/layout/header/BrowserSupportNotice.svelte';
	import LoadingOverlay2 from '$lib/shared/layout/LoadingOverlay2.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import ParaglideJsSvelteKitProviderCsr from '$lib/shared/i18n/ParaglideJsSvelteKitProviderCsr.svelte';

	export let data: PageData;

	$: if (browser) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params
		});
	}

	// for initial page load, where navigating store is not available
	let pageLoaded = false;
	onMount(() => {
		pageLoaded = true;
	});

	$: loading = $navigating || !pageLoaded;
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<ParaglideJsSvelteKitProviderCsr>
	<QueryClientProvider client={data.queryClient}>
		<BrowserSupportNotice />

		{#if loading}
			<!--	<LoadingOverlay />-->
			<LoadingOverlay2 />
		{:else}
			<Header />

			<slot />

			<Footer />
		{/if}
	</QueryClientProvider>
</ParaglideJsSvelteKitProviderCsr>
