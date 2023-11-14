<script lang="ts">
	import Icon from '@iconify/svelte';
	import { melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import * as m from '$lib/shared/i18n/compiled/messages';

	import FlyoutItem from './FlyoutItem.svelte';

	import type { FlyoutNavItem, FlyoutDefinition } from './types';

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
		class="text-high-contrast flex items-center gap-x-1 text-sm font-semibold leading-6"
	>
		{m[item.name]()}
		<Icon icon="tabler:chevron-down" class="text-neutral-9" aria-hidden="true" />
	</button>

	{#key $open}
		<div
			use:melt={$menu}
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
			class="bg-neutral-2 z-30 mt-3 w-96 rounded-3xl p-4 shadow-lg"
		>
			{#each items as sub_item (sub_item.name)}
				<div use:itemE>
					<FlyoutItem item={sub_item} />
				</div>
			{/each}
		</div>
	{/key}
</div>
