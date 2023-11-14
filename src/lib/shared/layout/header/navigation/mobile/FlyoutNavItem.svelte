<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createCollapsible, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	import * as m from '$lib/shared/i18n/compiled/messages';

	import type { FlyoutNavItem, FlyoutDefinition } from '../types';

	export let item: FlyoutNavItem;

	const {
		elements: { root, content, trigger },
		states: { open }
	} = createCollapsible({
		forceVisible: true
	});

	$: items = (item.flyout as FlyoutDefinition).items;
</script>

<div class="-mx-3" use:melt={$root}>
	<button
		use:melt={$trigger}
		class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7"
	>
		{m[item.name]()}
		<Icon icon="lucide:chevron-down" class="h-5 w-5 flex-none {$open ? 'rotate-180' : ''}" />
	</button>
	{#if $open}
		<div use:melt={$content} class="mt-2 space-y-2" transition:slide>
			{#each items as sub_item (sub_item.name)}
				<a
					href={sub_item.href}
					class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7"
				>
					{m[sub_item.name]()}
				</a>
			{/each}
		</div>
	{/if}
</div>
