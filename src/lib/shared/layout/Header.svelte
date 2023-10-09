<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Icon from '@iconify/svelte';
	import {
		Dialog,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Popover,
		PopoverButton,
		PopoverGroup,
		PopoverPanel
	} from '@rgossiaux/svelte-headlessui';
	import { navigation } from '$lib/shared/layout/navigation';

	import { fade } from 'svelte/transition';
	import ThemeSwitch from '$lib/shared/theme/ThemeSwitch.svelte';
	import BrandLogo from '$lib/shared/layout/BrandLogo.svelte';
	import LocaleSwitch from '$lib/i18n/LocaleSwitch.svelte';

	let mobileMenuOpen = false;
</script>

<header class="border-rainbow absolute inset-x-0 top-0 z-30 border-b-2 bg-neutral-2">
	<div id="head-banner-holder" />
	<nav class="mx-auto max-w-7xl flex items-center justify-between p-6 lg:px-8" aria-label="Navbar">
		<div class="flex items-center gap-x-12">
			<a href="/" class="p-1.5 -m-1.5">
				<span class="sr-only">SXYA Community</span>
				<BrandLogo class="h-8 w-auto" />
			</a>
			<PopoverGroup class="hidden lg:flex lg:gap-x-12">
				{#each navigation as item (item.name)}
					{#if item.type === 'pure'}
						<a href={item.href} class="text-sm font-semibold leading-6 text-high-contrast">
							{$_(item.name)}
						</a>
					{:else if item.type === 'flyout'}
						{#if item.flyout.rich}
							<Popover class="relative" let:open>
								<PopoverButton
									class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-high-contrast"
								>
									<span>{$_(item.name)}</span>
									<Icon icon="tabler:chevron-down" class="text-neutral-9" aria-hidden="true" />
								</PopoverButton>

								{#if open}
									<div in:fade={{ duration: 200 }} out:fade={{ duration: 150 }}>
										<PopoverPanel
											static
											class="absolute left-1/2 z-10 mt-5 max-w-max w-screen flex px-4 -translate-x-1/2"
										>
											<div
												class="max-w-md w-screen flex-auto overflow-hidden rounded-3xl bg-neutral-3 text-sm leading-6 shadow-lg"
											>
												<div class="p-4">
													{#each item.flyout.items as sub_item (sub_item.name)}
														<div
															class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-neutral-4"
														>
															<div
																class="mt-1 h-11 w-11 flex flex-none items-center justify-center rounded-lg bg-neutral-3 group-hover:bg-neutral-4"
															>
																<Icon
																	icon={sub_item.icon}
																	class="h-6 w-6 -m-2 text-low-contrast group-hover:text-accent-11"
																/>
															</div>
															<div>
																<a href={sub_item.href} class="font-semibold text-high-contrast">
																	{$_(sub_item.name)}
																	<span class="absolute inset-0" />
																</a>
																<p class="mt-1 text-low-contrast">{$_(sub_item.description)}</p>
															</div>
														</div>
													{/each}
												</div>
											</div>
										</PopoverPanel>
									</div>
								{/if}
							</Popover>
						{:else}
							<Popover class="relative" let:open>
								<PopoverButton
									class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-high-contrast"
								>
									{$_(item.name)}
									<Icon icon="tabler:chevron-down" class="text-neutral-9" aria-hidden="true" />
								</PopoverButton>

								{#if open}
									<div in:fade={{ duration: 200 }} out:fade={{ duration: 150 }}>
										<PopoverPanel
											static
											class="absolute top-full z-10 mt-3 w-96 rounded-3xl bg-neutral-3 p-4 shadow-lg -left-8"
										>
											{#each item.flyout.items as sub_item (sub_item.name)}
												<div class="relative rounded-lg p-4 hover:bg-neutral-4">
													<a
														href={sub_item.href}
														class="block text-sm font-semibold leading-6 text-high-contrast"
													>
														{$_(sub_item.name)}
														<span class="absolute inset-0" />
													</a>
													{#if sub_item.description}
														<p class="mt-1 text-sm leading-6 text-low-contrast">
															{$_(sub_item.description)}
														</p>
													{/if}
												</div>
											{/each}
										</PopoverPanel>
									</div>
								{/if}
							</Popover>
						{/if}
					{/if}
				{/each}
			</PopoverGroup>
		</div>
		{#if !mobileMenuOpen}
			<div class="flex lg:hidden">
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md p-2.5 text-neutral-9 -m-2.5"
					on:click={() => (mobileMenuOpen = true)}
				>
					<span class="sr-only">{$_('navigation.open')}</span>
					<Icon icon="tabler:menu-2" class="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
		{/if}
		<div class="hidden gap-x-4 lg:flex">
			<LocaleSwitch class="w-46" />
			<ThemeSwitch class="w-36" />
		</div>
	</nav>
	<Dialog
		as="div"
		class="lg:hidden"
		open={mobileMenuOpen}
		on:close={() => (mobileMenuOpen = false)}
	>
		<div
			class="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-neutral-2 px-6 py-6 sm:max-w-sm"
		>
			<div class="flex items-center justify-between">
				<a href="/" class="p-1.5 -m-1.5">
					<span class="sr-only">SXYA Community</span>
					<BrandLogo class="h-8 w-auto" />
				</a>
				{#if mobileMenuOpen}
					<button
						type="button"
						class="rounded-md p-2.5 text-neutral-9 -m-2.5"
						on:click={() => (mobileMenuOpen = false)}
					>
						<span class="sr-only">{$_('navigation.close')}</span>
						<Icon icon="tabler:x" class="h-6 w-6" aria-hidden="true" />
					</button>
				{/if}
			</div>
			<div class="mt-8 flow-root">
				<div class="-my-6">
					<div class="py-6 space-y-2">
						{#each navigation as item (item.name)}
							{#if item.type === 'pure'}
								<a
									href={item.href}
									class="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-high-contrast -mx-3"
								>
									{$_(item.name)}
								</a>
							{:else if item.type === 'flyout'}
								<Disclosure as="div" class="-mx-3" let:open>
									<DisclosureButton
										class="w-full flex items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-high-contrast"
									>
										{$_(item.name)}
										<Icon
											icon="tabler:chevron-down"
											aria-hidden="true"
											class="h-5 w-5 flex-none text-neutral-9 {open ? 'rotate-180' : ''}"
										/>
									</DisclosureButton>
									<DisclosurePanel class="mt-2 space-y-2">
										{#each item.flyout.items as sub_item (sub_item.name)}
											<DisclosureButton
												as="a"
												href={sub_item.href}
												class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-high-contrast"
											>
												{$_(sub_item.name)}
											</DisclosureButton>
										{/each}
									</DisclosurePanel>
								</Disclosure>
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
	</Dialog>
</header>
