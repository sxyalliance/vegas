<script lang="ts">
	import { browser } from '$app/environment';
	import { navigating, page } from '$app/stores';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { onMount } from 'svelte';

	import { webVitals } from '$lib/shared/analytics/vitals';
	import ParaglideJsSvelteKitProviderCsr from '$lib/shared/i18n/ParaglideJsSvelteKitProviderCsr.svelte';
	import Footer from '$lib/shared/layout/Footer.svelte';
	import BrowserSupportNotice from '$lib/shared/layout/header/BrowserSupportNotice.svelte';
	import Header from '$lib/shared/layout/header/Header.svelte';
	import LoadingOverlay2 from '$lib/shared/layout/LoadingOverlay2.svelte';

	import type { LayoutData } from './$types';
	import '$lib/assets/app.css';
	import '$lib/assets/rainbow.css';

	export let data: LayoutData;

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

	$: {
		if (browser) {
			if (loading) {
				document.body.classList.add('overflow-hidden');
			} else {
				document.body.classList.remove('overflow-hidden');
			}
		}
	}
</script>

<ParaglideJsSvelteKitProviderCsr>
	<QueryClientProvider client={data.queryClient}>
		<BrowserSupportNotice />

		{#if loading}
			<!--	<LoadingOverlay />-->
			<LoadingOverlay2 />
		{/if}

		<Header />

		<slot />

		<Footer />
	</QueryClientProvider>
</ParaglideJsSvelteKitProviderCsr>
