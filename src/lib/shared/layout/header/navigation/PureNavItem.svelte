<script lang="ts">
	import type { PureNavItem } from './types';
	import { _ } from 'svelte-i18n';

	export let item: PureNavItem;
</script>

<a href={item.href} class="text-sm font-semibold leading-6 text-high-contrast">
	{$_(item.name)}
</a>
