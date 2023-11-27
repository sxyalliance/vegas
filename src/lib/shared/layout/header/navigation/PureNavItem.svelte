<script lang="ts">
	import * as m from '$i18n/messages';

	import type { PureNavItem } from './types';

	export let item: PureNavItem;
</script>

<a href={item.href} class="text-sm font-semibold leading-6">
	{m[item.name]()}
</a>
