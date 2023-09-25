<script lang="ts">
  import HeroSection from "./HeroSection.svelte";
  import { title } from "$lib/stores/title";
  import type { PageData } from "./$types";
  import PostListItem from "$lib/notion/components/PostListItem.svelte";

  export let data: PageData;

  title.set("Events");
</script>

<HeroSection />

<section class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
  {#each data.events as event}
    <PostListItem properties={event} />
  {/each}
</section>
