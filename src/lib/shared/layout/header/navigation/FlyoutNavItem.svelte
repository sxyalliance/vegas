<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Icon from '@iconify/svelte';
	import type { FlyoutNavItem, FlyoutDefinition } from './types';
	import { fade } from 'svelte/transition';
	import { melt } from '@melt-ui/svelte';
	import FlyoutItem from './FlyoutItem.svelte';

	export let item: FlyoutNavItem;

	export let builder: ReturnType<
		typeof import('@melt-ui/svelte').createMenubar
	>['builders']['createMenu'];

	const {
		elements: { trigger, menu, item: itemE },
		states: { open }
	} = builder({
		forceVisible: true,
		positioning: {
			placement: 'bottom'
		}
	});

	$: items = (item.flyout as FlyoutDefinition).items;
</script>

<div class="relative">
	<button
		use:melt={$trigger}
		class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-high-contrast"
	>
		{$_(item.name)}
		<Icon icon="tabler:chevron-down" class="text-neutral-9" aria-hidden="true" />
	</button>

	{#if $open}
		<div
			use:melt={$menu}
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
			class="z-30 mt-3 w-96 rounded-3xl bg-neutral-2 p-4 shadow-lg"
		>
			{#each items as sub_item (sub_item.name)}
				<div use:itemE>
					<FlyoutItem item={sub_item} />
				</div>
			{/each}
		</div>
	{/if}
</div>
