<script lang="ts">
	import type { RichFlyoutItem } from './types';
	import Icon from '@iconify/svelte';
	import { _ } from '$lib/shared/i18n';

	export let item: RichFlyoutItem;
</script>

<div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-neutral-3">
	<div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-neutralA-2">
		<Icon icon={item.icon} class="-m-2 h-6 w-6 text-low-contrast group-hover:text-accent-11" />
	</div>
	<div>
		<a href={item.href} class="font-semibold text-high-contrast">
			{_(item.name)}
			<span class="absolute inset-0" />
		</a>
		<p class="mt-1 text-low-contrast">{_(item.description)}</p>
	</div>
</div>
