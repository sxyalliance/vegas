<script lang="ts">
	interface TableOfContentItems {
		type: string;
		text: string;
		id: string;
	}

	export let tableOfContent: (TableOfContentItems | undefined)[] | undefined;
</script>

{#if tableOfContent && tableOfContent?.length > 0}
	<nav class="panel flex flex-1 flex-col" aria-label="Table of Content">
		<ul role="list" class="-m-2 space-y-1">
			{#each tableOfContent as content}
				{#if content}
					<li>
						<a
							href="#{content.id}"
							class="text-hue11 hover:text-primary10 hover:bg-hue3 group flex gap-x-3 rounded-md p-2 px-4 text-sm font-semibold leading-6"
							class:indent-4={content.type === 'heading_2'}
							class:indent={content.type === 'heading_3'}
						>
							{content.text}
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</nav>
{/if}
