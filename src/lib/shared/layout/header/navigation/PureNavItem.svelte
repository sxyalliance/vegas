<script lang="ts">
	import * as m from '$lib/shared/i18n/compiled/messages';

	import type { PureNavItem } from './types';

	export let item: PureNavItem;
</script>

<a href={item.href} class="text-sm font-semibold leading-6 text-high-contrast">
	{m[item.name]()}
</a>
