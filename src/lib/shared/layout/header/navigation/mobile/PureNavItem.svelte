<script lang="ts">
	import * as m from '$lib/shared/i18n/compiled/messages';

	import type { PureNavItem } from '../types';

	export let item: PureNavItem;
</script>

<a href={item.href} class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7">
	{m[item.name]()}
</a>
