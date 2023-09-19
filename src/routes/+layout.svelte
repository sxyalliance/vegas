<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import {browser, dev} from "$app/environment";
  import {page} from "$app/stores";
  import {webVitals} from "$lib/vitals";
  import BottomCenterFloatingNotice from "./BottomCenterFloatingNotice.svelte";
  import {title} from "$lib/stores/title";

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId
    })
  }
</script>

<svelte:head>
    <title>{$title}</title>
</svelte:head>

<Header/>

<slot/>

<Footer/>

<!--<BottomCenterFloatingNotice/>-->
