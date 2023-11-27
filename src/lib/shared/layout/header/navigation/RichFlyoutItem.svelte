<script lang="ts">
	import Icon from '@iconify/svelte';

	import * as m from '$i18n/messages';

	import type { RichFlyoutItem } from './types';

	export let item: RichFlyoutItem;
</script>

<div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-accent">
	<div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-muted">
		<Icon
			icon={item.icon}
			class="-m-2 h-6 w-6 text-muted-foreground group-hover:text-accent-foreground"
		/>
	</div>
	<div>
		<a href={item.href} class="font-semibold">
			{m[item.name]()}
			<span class="absolute inset-0" />
		</a>
		<p class="mt-1 text-muted-foreground">{m[item.description]()}</p>
	</div>
</div>
