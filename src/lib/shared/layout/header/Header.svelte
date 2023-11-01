<script lang="ts">
	import Icon from '@iconify/svelte';

	import { _ } from '$lib/shared/i18n';

	import LocaleSwitch from '$lib/shared/i18n/LocaleSwitch.svelte';
	import BrandLogo from '$lib/shared/layout/BrandLogo.svelte';
	import DesktopNavigation from '$lib/shared/layout/header/DesktopNavigation.svelte';
	import MobileNavigation from '$lib/shared/layout/header/MobileNavigation.svelte';
	import ThemeSwitch from '$lib/shared/theme/ThemeSwitch.svelte';

	let mobileMenuOpen = false;
</script>

<header class="border-rainbow z-30 border-b-2 bg-neutral-2">
	<div id="head-banner-holder" />
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Navbar">
		<div class="flex items-center gap-x-12">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">
					{_('common_brand_name')}
				</span>
				<BrandLogo class="h-8 w-auto" />
			</a>
			<DesktopNavigation />
		</div>
		{#if !mobileMenuOpen}
			<div class="flex lg:hidden">
				<button
					type="button"
					class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-9"
					on:click={() => (mobileMenuOpen = true)}
				>
					<span class="sr-only">{_('navigation_open')}</span>
					<Icon icon="tabler:menu-2" class="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
		{/if}
		<div class="hidden gap-x-4 lg:flex">
			<LocaleSwitch class="w-46" />
			<ThemeSwitch class="w-36" />
		</div>
	</nav>
	<MobileNavigation bind:mobileMenuOpen />
</header>
