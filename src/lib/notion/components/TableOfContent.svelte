<script lang="ts">
	interface TableOfContentItems {
		type: string;
		text: string;
		id: string;
	}

	export let tableOfContent: (TableOfContentItems | undefined)[] | undefined;
</script>

<h3>Table of Contents</h3>

{#if tableOfContent && tableOfContent?.length > 0}
	<ul>
		{#each tableOfContent as content}
			{#if content}
				{#if content.type === 'heading_1'}
					<li class="text-base font-semibold my-3">
						<a class="no-underline" href={'#' + content.id}>{content.text}</a>
					</li>
				{:else if content.type === 'heading_2'}
					<li class="indent-4 text-sm font-semibold my-2.5">
						<a class="no-underline" href={'#' + content.id}>{content.text}</a>
					</li>
				{:else if content.type === 'heading_3'}
					<li class="indent text-xs font-semibold my-1">
						<a class="no-underline" href={'#' + content.id}>{content.text}</a>
					</li>
				{/if}
			{/if}
		{/each}
	</ul>
{/if}
