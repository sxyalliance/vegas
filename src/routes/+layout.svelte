<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { browser } from '$app/environment';
	import { navigating, page } from '$app/stores';
	import { webVitals } from '$lib/analytics/vitals';
	import BottomCenterFloatingNotice from './BottomCenterFloatingNotice.svelte';
	import { title } from '$lib/stores/title';

	import '$lib/assets/rainbow.css';
	import { isLoading } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import BrowserSupportNotice from '$lib/components/layout/BrowserSupportNotice.svelte';
	import LoadingOverlay2 from '$lib/components/layout/LoadingOverlay2.svelte';

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

	$: loading = $navigating || $isLoading || !pageLoaded;
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<BrowserSupportNotice />

{#if loading}
	<!--	<LoadingOverlay />-->
	<LoadingOverlay2 />
{:else}
	<Header />

	<slot />

	<Footer />
{/if}

<BottomCenterFloatingNotice />
