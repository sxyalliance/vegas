<script lang="ts">
	import * as m from '$i18n/messages';

	import type { FlyoutItem } from './types';

	export let item: FlyoutItem;
</script>

<div class="group relative rounded-lg p-4 hover:bg-accent">
	<a
		href={item.href}
		class="block text-sm font-semibold leading-6 group-hover:text-accent-foreground"
	>
		{m[item.name]()}
		<span class="absolute inset-0" />
	</a>
	{#if item.description}
		<p class="mt-1 text-sm leading-6 text-muted-foreground">
			{m[item.description]()}
		</p>
	{/if}
</div>
