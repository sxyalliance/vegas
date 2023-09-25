<script lang="ts">
  import type {
    BulletedListItemBlockObjectResponse,
  } from "@notionhq/client/build/src/api-endpoints";
  import RichText from "./RichText.svelte";

  export let block: BulletedListItemBlockObjectResponse;
</script>

{#if block && block.bulleted_list_item?.rich_text.length > 0}
  {#each block.bulleted_list_item.rich_text as item }
    <RichText text={item} />
  {/each}
{/if}
