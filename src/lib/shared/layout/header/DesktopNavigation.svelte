<script>
	import * as Nav from './navigation';
	import { createMenubar } from '@melt-ui/svelte';
	import { melt } from '@melt-ui/svelte';
	import SeoNavigation from '$lib/shared/layout/header/navigation/SeoNavigation.svelte';

	const {
		elements: { menubar },
		builders: { createMenu }
	} = createMenubar();
</script>

<SeoNavigation definition={Nav.definition} />

<div class="hidden lg:flex lg:gap-x-12" use:melt={$menubar}>
	{#each Nav.definition as item (item.name)}
		{#if item.type === 'pure'}
			<Nav.PureNavItem {item} />
		{:else if item.type === 'flyout'}
			{#if item.flyout.rich}
				<Nav.RichFlyoutNavItem {item} builder={createMenu} />
			{:else}
				<Nav.FlyoutNavItem {item} builder={createMenu} />
			{/if}
		{/if}
	{/each}
</div>
