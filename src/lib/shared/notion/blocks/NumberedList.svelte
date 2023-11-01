<script lang="ts">
	import RichText from './RichText.svelte';

	import type { NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

	export let block: NumberedListItemBlockObjectResponse;
</script>

{#if block && block.numbered_list_item.rich_text?.length > 0}
	{#each block.numbered_list_item.rich_text as item}
		<RichText text={item} />
	{/each}
{/if}
