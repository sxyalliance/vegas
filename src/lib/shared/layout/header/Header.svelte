<script lang="ts">
	import Icon from '@iconify/svelte';

	import * as m from '$lib/shared/i18n/compiled/messages';

	import BrandLogo from '$lib/shared/layout/BrandLogo.svelte';
	import BrowserSupportNotice from '$lib/shared/layout/header/BrowserSupportNotice.svelte';
	import DesktopNavigation from '$lib/shared/layout/header/DesktopNavigation.svelte';
	import MobileNavigation from '$lib/shared/layout/header/MobileNavigation.svelte';
	import PreferencesSheet from '$lib/shared/layout/preferences/PreferencesSheet.svelte';
	import { Button } from '$lib/vgui/components/ui/button';

	let mobileMenuOpen = false;
	let preferencesOpen = false;
	let preferencesSide: 'right' | 'bottom' = 'right';
	$: preferencesSide = mobileMenuOpen ? 'bottom' : 'right';
</script>

<header class="border-rainbow z-30 border-b-2 bg-background shadow-md">
	<BrowserSupportNotice />

	<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Navbar">
		<div class="flex items-center gap-x-12">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">
					{m.common_brand_name()}
				</span>
				<BrandLogo class="h-8 w-auto" />
			</a>
			<DesktopNavigation />
		</div>
		{#if !mobileMenuOpen}
			<div class="flex lg:hidden">
				<Button
					variant="outline"
					size="icon"
					on:click={() => (mobileMenuOpen = true)}
					aria-label={m.navigation_open()}
				>
					<Icon icon="lucide:menu" class="h-6 w-6" />
				</Button>
			</div>
		{/if}
		<div class="hidden gap-x-4 lg:flex">
			<Button variant="outline" size="icon" on:click={() => (preferencesOpen = true)}>
				<Icon icon="lucide:settings-2" class="h-5 w-5" />
			</Button>
		</div>
	</nav>
	<MobileNavigation bind:mobileMenuOpen bind:preferencesOpen />
</header>

<PreferencesSheet side={preferencesSide} bind:open={preferencesOpen} />
