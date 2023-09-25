<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { browser } from "$app/environment";
  import { navigating, page } from "$app/stores";
  import { webVitals } from "$lib/vitals";
  import BottomCenterFloatingNotice from "./BottomCenterFloatingNotice.svelte";
  import { title } from "$lib/stores/title";

  import "./rainbow.css";
  import LoadingOverlay from "$lib/components/LoadingOverlay.svelte";
  import { Plane } from "svelte-loading-spinners";

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId
    });
  }
</script>

<svelte:head>
  <title>{$title}</title>
</svelte:head>

{#if $navigating}
  <LoadingOverlay />
{:else}
  <Header />

  <slot />

  <Footer />
{/if}

<BottomCenterFloatingNotice />
