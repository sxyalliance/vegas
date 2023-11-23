<script lang="ts">
	import Icon from '@iconify/svelte';
	import { melt, createDialog } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	import * as m from '$lib/shared/i18n/compiled/messages';
	import BrandLogo from '$lib/shared/layout/BrandLogo.svelte';

	import { Button } from '$lib/vgui/components/ui/button';

	import * as Nav from './navigation';

	export let mobileMenuOpen = false;

	export let preferencesOpen = false;

	const store = writable(mobileMenuOpen);
	$: store.set(mobileMenuOpen);
	store.subscribe((value) => mobileMenuOpen !== value && (mobileMenuOpen = value));

	const {
		elements: { content, close, portalled },
		states: { open }
	} = createDialog({
		open: store
	});
</script>

<div use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$content}
			transition:fly
			class="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-popover px-6 py-6 text-popover-foreground sm:max-w-sm"
		>
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5">
					<span class="sr-only">{m.common_brand_name()}</span>
					<BrandLogo class="h-8 w-auto" />
				</a>
				<div use:melt={$close}>
					<Button variant="outline" size="icon" aria-label={m.navigation_close()}>
						<Icon icon="lucide:x" class="h-6 w-6" />
					</Button>
				</div>
			</div>
			<div class="mt-8 flow-root">
				<div class="-my-6">
					<div class="space-y-2 py-6">
						{#each Nav.definition as item (item.name)}
							{#if item.type === 'pure'}
								<Nav.Mobile.PureNavItem {item} />
							{:else if item.type === 'flyout'}
								<Nav.Mobile.FlyoutNavItem {item} />
							{/if}
						{/each}
					</div>

					<div class="space-y-4">
						<Button
							variant="outline"
							size="lg"
							class="w-full"
							on:click={() => (preferencesOpen = true)}
						>
							<Icon icon="lucide:settings-2" class="mr-2 h-5 w-5" />
							Open Preferences
						</Button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
