<script lang="ts">
  import type { PageData } from "./$types";
  import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
  import TableOfContent from "$lib/notion/components/TableOfContent.svelte";
  import BlockRenderer from "$lib/notion/components/blocks/BlockRenderer.svelte";

  export let data: PageData;

  $: toc = data.event.blocks.map((block: BlockObjectResponse) => {
    if (block.type === "heading_1") {
      return {
        type: block.type,
        text: block.heading_1?.rich_text?.map((t) => t.plain_text)?.join(" "),
        id: block.id
      };
    } else if (block.type === "heading_2") {
      return {
        type: block.type,
        text: block.heading_2?.rich_text?.map((t) => t.plain_text)?.join(" "),
        id: block.id
      };
    } else if (block.type === "heading_3") {
      return {
        type: block.type,
        text: block.heading_3?.rich_text?.map((t) => t.plain_text)?.join(" "),
        id: block.id
      };
    } else {
      return undefined;
    }
  });
</script>

<section class="bg-hue1 px-6 py-32 lg:px-8">
  {#if data.event.blocks && data.event.blocks.length > 0}
    <article class="mx-auto max-w-3xl text-base leading-7">
      <p class="text-base font-semibold leading-7 text-primary11">
        {data.event.properties.title}
      </p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-hue12 sm:text-4xl">
        {data.event.properties.title}
      </h1>
      <p class="mt-6 text-xl leading-8 text-hue11">
        {data.event.properties.description}
      </p>

      <TableOfContent tableOfContent={toc} />

      <div class="mt-10 max-w-2xl prose prose-here">
        <h1 id="0713140d-b39a-4348-bbce-684b1edaeaf6">Heading 12</h1>
        {#each data.event.blocks as block}
          <BlockRenderer {block} />
        {/each}
      </div>
    </article>
  {/if}
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
