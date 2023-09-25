<script lang="ts">
  import type { PageData } from "./$types";
  import HeroSection from "../HeroSection.svelte";

  export let data: PageData;
</script>

<section class="bg-hue1 px-6 py-32 lg:px-8">
  <article class="mx-auto max-w-3xl text-base leading-7">
    <p class="text-base font-semibold leading-7 text-primary11">
      {data.meta.category}
    </p>
    <h1 class="mt-2 text-3xl font-bold tracking-tight text-hue12 sm:text-4xl">
      {data.meta.name}
    </h1>
    <p class="mt-6 text-xl leading-8 text-hue11">
      {data.meta.description}
    </p>

    <div class="mt-10 max-w-2xl prose prose-here">、
      <svelte:component this={data.content} />
    </div>
  </article>
</section>

<style>
    .prose-here {
        --un-prose-body: var(--un-preset-radix-hue11);
        --un-prose-headings: var(--un-preset-radix-hue12);
        --un-prose-links: var(--un-preset-radix-indigo12);
        --un-prose-lists: var(--un-preset-radix-hue10);
        --un-prose-hr: var(--un-preset-radix-hue8);
        --un-prose-captions: var(--un-preset-radix-hue10);
        --un-prose-code: var(--un-preset-radix-hue12);
        --un-prose-borders: var(--un-preset-radix-hue6);
        --un-prose-bg-soft: var(--un-preset-radix-hue2);
    }
</style>
