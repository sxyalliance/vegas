<script lang="ts">
	import Icon from '@iconify/svelte';

	import * as m from '$lib/shared/i18n/compiled/messages';

	import type { RichFlyoutItem } from './types';

	export let item: RichFlyoutItem;
</script>

<div class="hover:bg-neutral-3 group relative flex gap-x-6 rounded-lg p-4">
	<div class="bg-neutralA-2 mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
		<Icon icon={item.icon} class="text-low-contrast group-hover:text-accent-11 -m-2 h-6 w-6" />
	</div>
	<div>
		<a href={item.href} class="text-high-contrast font-semibold">
			{m[item.name]()}
			<span class="absolute inset-0" />
		</a>
		<p class="text-low-contrast mt-1">{m[item.description]()}</p>
	</div>
</div>
