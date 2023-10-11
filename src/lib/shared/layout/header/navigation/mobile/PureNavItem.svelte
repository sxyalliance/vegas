<script lang="ts">
	import type { PureNavItem } from '../types';
	import { _ } from 'svelte-i18n';

	export let item: PureNavItem;
</script>

<a
	href={item.href}
	class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-high-contrast"
>
	{$_(item.name)}
</a>
