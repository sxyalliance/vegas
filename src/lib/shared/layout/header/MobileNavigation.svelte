<script lang="ts">
	import Icon from '@iconify/svelte';
	import { melt, createDialog } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	import * as m from '$lib/shared/i18n/compiled/messages';
	import LocaleSwitch from '$lib/shared/i18n/LocaleSwitch.svelte';
	import BrandLogo from '$lib/shared/layout/BrandLogo.svelte';
	import ThemeSwitch from '$lib/shared/theme/ThemeSwitch.svelte';

	import * as Nav from './navigation';

	export let mobileMenuOpen = false;

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
			class="bg-neutral-2 fixed inset-y-0 right-0 z-40 w-full overflow-y-auto px-6 py-6 sm:max-w-sm"
		>
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5">
					<span class="sr-only">{m.common_brand_name()}</span>
					<BrandLogo class="h-8 w-auto" />
				</a>
				<button type="button" class="text-neutral-9 -m-2.5 rounded-md p-2.5" use:melt={$close}>
					<span class="sr-only">{m.navigation_close()}</span>
					<Icon icon="tabler:x" class="h-6 w-6" aria-hidden="true" />
				</button>
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
						<LocaleSwitch class="w-full" />
						<ThemeSwitch class="w-full" />
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
