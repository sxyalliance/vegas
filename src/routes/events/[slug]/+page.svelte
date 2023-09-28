<script lang="ts">
	import type { PageData } from './$types';
	import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import TableOfContent from '$lib/notion/components/TableOfContent.svelte';
	import BlockRenderer from '$lib/notion/components/blocks/BlockRenderer.svelte';
	import EventProperties from './EventProperties.svelte';
	import { _ } from 'svelte-i18n';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	$: toc = data.event.blocks.map((block: BlockObjectResponse) => {
		if (block.type === 'heading_1') {
			return {
				type: block.type,
				text: block.heading_1?.rich_text?.map((t) => t.plain_text)?.join(' '),
				id: block.id
			};
		} else if (block.type === 'heading_2') {
			return {
				type: block.type,
				text: block.heading_2?.rich_text?.map((t) => t.plain_text)?.join(' '),
				id: block.id
			};
		} else if (block.type === 'heading_3') {
			return {
				type: block.type,
				text: block.heading_3?.rich_text?.map((t) => t.plain_text)?.join(' '),
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
				{$_(`event.category.${data.event.properties.category}.name`)}
				#{data.event.properties.extra.id}
			</p>
			<h1 class="mt-2 text-3xl font-bold tracking-tight text-hue12 sm:text-4xl">
				{data.event.properties.title}
			</h1>
			<p class="my-4 text-xl leading-8 text-hue11">
				{data.event.properties.description}
			</p>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div class="col-span-2 lg:order-last">
					<EventProperties properties={data.event.properties} />
				</div>

				<div class="col-span-1">
					<TableOfContent tableOfContent={toc} />
				</div>
			</div>

			<div class="relative my-6">
				<div class="absolute inset-0 flex items-center" aria-hidden="true">
					<div class="w-full border-t border-hue6" />
				</div>
				<div class="relative flex justify-center">
					<span class="px-2 text-hue10 bg-hue1">
						<Icon icon="tabler:lego" class="h-5 w-5" />
					</span>
				</div>
			</div>

			<div class="prose-here max-w-full prose">
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
