<script lang="ts">
	import { _ } from '$lib/shared/i18n';

	import type { PureNavItem } from './types';

	export let item: PureNavItem;
</script>

<a href={item.href} class="text-sm font-semibold leading-6 text-high-contrast">
	{_(item.name)}
</a>
