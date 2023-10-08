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
	import { navigation } from '$lib/components/layout/navigation';

	import { fade } from 'svelte/transition';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import BrandLogo from '$lib/components/layout/BrandLogo.svelte';
	import LocaleSwitch from '$lib/components/LocaleSwitch.svelte';

	let mobileMenuOpen = false;
</script>

<header class="border-rainbow absolute inset-x-0 top-0 z-30 border-b-2 bg-hue1">
	<div id="head-banner-holder" />
	<nav class="mx-auto max-w-7xl flex items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex items-center gap-x-12">
			<a href="/static" class="p-1.5 -m-1.5">
				<span class="sr-only">SXYA Community</span>
				<BrandLogo class="h-8 w-auto" />
			</a>
			<PopoverGroup class="hidden lg:flex lg:gap-x-12">
				{#each navigation as item (item.name)}
					{#if item.type === 'pure'}
						<a href={item.href} class="text-sm font-semibold leading-6 text-hue12">
							{$_(item.name)}
						</a>
					{:else if item.type === 'flyout'}
						{#if item.flyout.rich}
							<Popover class="relative" let:open>
								<PopoverButton
									class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-hue12"
								>
									<span>{$_(item.name)}</span>
									<Icon icon="tabler:chevron-down" class="text-hue10" aria-hidden="true" />
								</PopoverButton>

								{#if open}
									<div in:fade={{ duration: 200 }} out:fade={{ duration: 150 }}>
										<PopoverPanel
											static
											class="absolute left-1/2 z-10 mt-5 max-w-max w-screen flex px-4 -translate-x-1/2"
										>
											<div
												class="max-w-md w-screen flex-auto overflow-hidden rounded-3xl bg-hue1 text-sm leading-6 shadow-lg"
											>
												<div class="p-4">
													{#each item.flyout.items as sub_item (sub_item.name)}
														<div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-hue3">
															<div
																class="mt-1 h-11 w-11 flex flex-none items-center justify-center rounded-lg bg-hue2 group-hover:bg-hue1"
															>
																<Icon
																	icon={sub_item.icon}
																	class="h-6 w-6 text-hue11 group-hover:text-primary10"
																/>
															</div>
															<div>
																<a href={sub_item.href} class="font-semibold text-hue12">
																	{$_(sub_item.name)}
																	<span class="absolute inset-0" />
																</a>
																<p class="mt-1 text-hue11">{$_(sub_item.description)}</p>
															</div>
														</div>
													{/each}
												</div>
												<!--												<div class="bg-hue2 p-8">-->
												<!--													<div class="flex justify-between">-->
												<!--														<h3 class="text-sm font-semibold leading-6 text-hue10">-->
												<!--															Some posts (TODO)-->
												<!--														</h3>-->
												<!--														<a href="#" class="text-sm font-semibold leading-6 text-primary10">-->
												<!--															View all events-->
												<!--															<span aria-hidden="true">&rarr;</span>-->
												<!--														</a>-->
												<!--													</div>-->
												<!--													<ul role="list" class="mt-6 space-y-6">-->
												<!--														<li class="relative">-->
												<!--															<time-->
												<!--																datetime="2020-12-09T11:43"-->
												<!--																class="block text-xs leading-6 text-hue11"-->
												<!--															>-->
												<!--																2020-12-09 11:43-->
												<!--															</time>-->
												<!--															<a-->
												<!--																href="post.href"-->
												<!--																class="block truncate text-sm font-semibold leading-6 text-hue12"-->
												<!--															>-->
												<!--																title here-->
												<!--																<span class="absolute inset-0" />-->
												<!--															</a>-->
												<!--														</li>-->
												<!--													</ul>-->
												<!--												</div>-->
											</div>
										</PopoverPanel>
									</div>
								{/if}
							</Popover>
						{:else}
							<Popover class="relative" let:open>
								<PopoverButton
									class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-hue12"
								>
									{$_(item.name)}
									<Icon icon="tabler:chevron-down" class="text-hue10" aria-hidden="true" />
								</PopoverButton>

								{#if open}
									<div in:fade={{ duration: 200 }} out:fade={{ duration: 150 }}>
										<PopoverPanel
											static
											class="absolute top-full z-10 mt-3 w-96 rounded-3xl bg-hue1 p-4 shadow-lg -left-8"
										>
											{#each item.flyout.items as sub_item (sub_item.name)}
												<div class="relative rounded-lg p-4 hover:bg-hue2">
													<a
														href={sub_item.href}
														class="block text-sm font-semibold leading-6 text-hue12"
													>
														{$_(sub_item.name)}
														<span class="absolute inset-0" />
													</a>
													{#if sub_item.description}
														<p class="mt-1 text-sm leading-6 text-hue11">
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
					class="inline-flex items-center justify-center rounded-md p-2.5 text-hue11 -m-2.5"
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
		<div class="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-hue1 px-6 py-6 sm:max-w-sm">
			<div class="flex items-center justify-between">
				<a href="/static" class="p-1.5 -m-1.5">
					<span class="sr-only">SXYA Community</span>
					<BrandLogo class="h-8 w-auto" />
				</a>
				{#if mobileMenuOpen}
					<button
						type="button"
						class="rounded-md p-2.5 text-hue11 -m-2.5"
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
									class="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-hue12 -mx-3 hover:bg-hue2"
								>
									{$_(item.name)}
								</a>
							{:else if item.type === 'flyout'}
								<Disclosure as="div" class="-mx-3" let:open>
									<DisclosureButton
										class="w-full flex items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-hue12 hover:bg-hue2"
									>
										{$_(item.name)}
										<Icon
											icon="tabler:chevron-down"
											aria-hidden="true"
											class="h-5 w-5 flex-none text-hue11 {open ? 'rotate-180' : ''}"
										/>
									</DisclosureButton>
									<DisclosurePanel class="mt-2 space-y-2">
										{#each item.flyout.items as sub_item (sub_item.name)}
											<DisclosureButton
												as="a"
												href={sub_item.href}
												class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-hue12 hover:bg-hue2"
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
