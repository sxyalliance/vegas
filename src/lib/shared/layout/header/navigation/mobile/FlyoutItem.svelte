<script lang="ts">
	import * as m from '$lib/shared/i18n/compiled/messages';

	import type { FlyoutItem } from '../types';

	export let item: FlyoutItem;
</script>

<div class="relative rounded-lg p-4 hover:bg-neutral-3">
	<a href={item.href} class="block text-sm font-semibold leading-6 text-high-contrast">
		{m[item.name]()}
		<span class="absolute inset-0" />
	</a>
	{#if item.description}
		<p class="mt-1 text-sm leading-6 text-low-contrast">
			{m[item.description]()}
		</p>
	{/if}
</div>
