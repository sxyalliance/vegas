<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import {browser, dev} from "$app/environment";
  import {page} from "$app/stores";
  import {webVitals} from "$lib/vitals";
  import BottomCenterFloatingNotice from "./BottomCenterFloatingNotice.svelte";

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId
    })
  }
</script>

<Header/>

<slot/>

<Footer/>

<BottomCenterFloatingNotice/>
