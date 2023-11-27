<script lang="ts">
	import Icon from '@iconify/svelte';
	import { melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import * as m from '$i18n/messages';

	import RichFlyoutItem from './RichFlyoutItem.svelte';

	import type { FlyoutNavItem, RichFlyoutDefinition } from './types';

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

	$: items = (item.flyout as RichFlyoutDefinition).items;
</script>

<div class="relative">
	<button
		use:melt={$trigger}
		class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6"
	>
		<span>{m[item.name]()}</span>
		<Icon icon="lucide:chevron-down" />
	</button>

	{#key $open}
		<div
			use:melt={$menu}
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
			class="z-30 mt-5 flex px-4"
		>
			<div
				class="flex-auto overflow-hidden rounded-3xl bg-popover text-sm leading-6 text-popover-foreground shadow-lg"
			>
				<div class="p-4">
					{#each items as sub_item (sub_item.name)}
						<div use:itemE>
							<RichFlyoutItem item={sub_item} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/key}
</div>
