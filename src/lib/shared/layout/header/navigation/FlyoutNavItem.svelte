<script lang="ts">
	import Icon from '@iconify/svelte';
	import { melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import * as m from '$i18n/messages';

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
	<button use:melt={$trigger} class="flex items-center gap-x-1 text-sm font-semibold leading-6">
		{m[item.name]()}
		<Icon icon="lucide:chevron-down" />
	</button>

	{#key $open}
		<div
			use:melt={$menu}
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
			class="z-30 mt-3 w-96 rounded-3xl bg-popover p-4 text-popover-foreground shadow-lg"
		>
			{#each items as sub_item (sub_item.name)}
				<div use:itemE>
					<FlyoutItem item={sub_item} />
				</div>
			{/each}
		</div>
	{/key}
</div>
