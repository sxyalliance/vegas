<script>
	import { createMenubar, melt } from '@melt-ui/svelte';

	import * as Nav from './navigation';

	const {
		elements: { menubar },
		builders: { createMenu }
	} = createMenubar();
</script>

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
