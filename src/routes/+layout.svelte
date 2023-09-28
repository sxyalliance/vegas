<script lang="ts">
  import Header from "$lib/layout/Header.svelte";
  import Footer from "$lib/layout/Footer.svelte";
  import { browser } from "$app/environment";
  import { navigating, page } from "$app/stores";
  import { webVitals } from "$lib/analytics/vitals";
  import BottomCenterFloatingNotice from "./BottomCenterFloatingNotice.svelte";
  import { title } from "$lib/layout/title";

  import "./rainbow.css";
  import LoadingOverlay from "$lib/layout/LoadingOverlay.svelte";
  import { isLoading } from "svelte-i18n";
  import { onMount } from "svelte";

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId
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

{#if loading}
  <LoadingOverlay />
{:else}
  <Header />

  <slot />

  <Footer />
{/if}

<BottomCenterFloatingNotice />
