<script lang="ts">
  import logo from "$lib/assets/logo.png";
  import {_} from "svelte-i18n";
  import Icon from "@iconify/svelte";
  import {
    Dialog, DialogOverlay,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup, PopoverPanel
  } from "@rgossiaux/svelte-headlessui";
  import type {NavigationDefinition} from "$lib/types/navigation.js";

  import {fade} from "svelte/transition";

  let mobileMenuOpen = false;

  const navigation: NavigationDefinition = [
    {
      name: 'navigation.home',
      type: 'pure',
      href: '#',
    },
    {
      name: 'navigation.about',
      type: 'flyout',
      flyout: {
        rich: false,
        items: [
          {
            name: 'navigation.members',
            href: '#',
          },
          {
            name: 'navigation.chronicle',
            href: '#',
          },
        ]
      }
    },
    {
      name: 'navigation.resources',
      type: 'flyout',
      flyout: {
        rich: false,
        items: [
          {
            name: 'navigation.dictionary',
            href: '#',
          },
          {
            name: 'navigation.events',
            href: '#',
          },
        ]
      }
    },
    {
      name: 'navigation.other',
      type: 'flyout',
      flyout: {
        rich: true,
        items: [
          {
            name: 'navigation.universal_rules',
            href: '#',
            icon: 'tabler:ruler',
            highlight: 'text-green10',
            description: 'navigation.universal_rules_desc',
          },
          {
            name: 'navigation.meeting_planning_white_paper',
            href: '#',
            icon: 'tabler:school',
            highlight: 'text-orange10',
            description: 'navigation.meeting_planning_white_paper_desc',
          },
          {
            name: 'navigation.late_handling_reference',
            href: '#',
            icon: 'tabler:flag',
            highlight: 'text-blue10',
            description: 'navigation.late_handling_reference_desc',
          },
          {
            name: 'navigation.talk_shit_definition_white_paper',
            href: '#',
            icon: 'tabler:message-report',
            highlight: 'text-purple10',
            description: 'navigation.talk_shit_definition_white_paper_desc',
          },
        ]
      }
    },
  ];
</script>

<header class="absolute inset-x-0 top-0 z-50">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex items-center gap-x-12">
            <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">SXYA Community</span>
                <img class="h-8 w-auto" src={logo} alt=""/>
            </a>
            <PopoverGroup class="hidden lg:flex lg:gap-x-12">
                {#each navigation as item (item.name)}
                    {#if item.type === 'pure'}
                        <a href={item.href} class="text-sm font-semibold leading-6 text-hue12">
                            {$_(item.name)}
                        </a>
                    {:else if (item.type === 'flyout')}
                        {#if item.flyout.rich}
                            <Popover class="relative" let:open>
                                <PopoverButton
                                        class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-hue12">
                                    <span>{$_(item.name)}</span>
                                    <Icon icon="tabler:chevron-down" class="text-hue10" aria-hidden="true"/>
                                </PopoverButton>

                                {#if open}
                                    <div in:fade={{duration: 200}} out:fade={{duration: 150}}>
                                        <PopoverPanel static
                                                      class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                                            <div class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-hue1 text-sm leading-6 shadow-lg">
                                                <div class="p-4">
                                                    {#each item.flyout.items as sub_item (sub_item.name)}
                                                        <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-hue3">
                                                            <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-hue2 group-hover:bg-hue1">
                                                                <Icon icon={sub_item.icon}
                                                                      class="h-6 w-6 text-hue11 group-hover:text-primary10"/>
                                                            </div>
                                                            <div>
                                                                <a href={sub_item.href}
                                                                   class="font-semibold text-hue12">
                                                                    {$_(sub_item.name)}
                                                                    <span class="absolute inset-0"/>
                                                                </a>
                                                                <p class="mt-1 text-hue11">{$_(sub_item.description)}</p>
                                                            </div>
                                                        </div>
                                                    {/each}
                                                </div>
                                                <div class="bg-hue2 p-8">
                                                    <div class="flex justify-between">
                                                        <h3 class="text-sm font-semibold leading-6 text-hue10">
                                                            Some posts (TODO)
                                                        </h3>
                                                        <a href="#"
                                                           class="text-sm font-semibold leading-6 text-primary10">
                                                            View all events
                                                            <span aria-hidden="true">&rarr;</span>
                                                        </a>
                                                    </div>
                                                    <ul role="list" class="mt-6 space-y-6">
                                                        <li class="relative">
                                                            <time datetime="2020-12-09T11:43"
                                                                  class="block text-xs leading-6 text-hue11">
                                                                2020-12-09 11:43
                                                            </time>
                                                            <a href="post.href"
                                                               class="block truncate text-sm font-semibold leading-6 text-hue12">
                                                                title here
                                                                <span class="absolute inset-0"/>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </PopoverPanel>
                                    </div>
                                {/if}
                            </Popover>
                        {:else}
                            <Popover class="relative" let:open>
                                <PopoverButton
                                        class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-hue12">
                                    {$_(item.name)}
                                    <Icon icon="tabler:chevron-down" class="text-hue10" aria-hidden="true"/>
                                </PopoverButton>

                                {#if open}
                                    <div in:fade={{duration: 200}} out:fade={{duration: 150}}>
                                        <PopoverPanel static
                                                      class="absolute -left-8 top-full z-10 mt-3 w-96 rounded-3xl bg-hue1 p-4 shadow-lg">
                                            {#each item.flyout.items as sub_item (sub_item.name)}
                                                <div class="relative rounded-lg p-4 hover:bg-hue2">
                                                    <a href={sub_item.href}
                                                       class="block text-sm font-semibold leading-6 text-hue12">
                                                        {$_(sub_item.name)}
                                                        <span class="absolute inset-0"/>
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
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-hue11"
                        on:click={() => (mobileMenuOpen = true)}>
                    <span class="sr-only">{$_('navigation.open')}</span>
                    <Icon icon="tabler:menu-2" class="h-6 w-6" aria-hidden="true"/>
                </button>
            </div>
        {/if}
    </nav>
    <Dialog as="div" class="lg:hidden" open={mobileMenuOpen} on:close={() => (mobileMenuOpen = false)}>
        <div class="fixed inset-0 z-10"/>
        <DialogOverlay/>
        <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-hue1 px-6 py-6 sm:max-w-sm">
            <div class="flex items-center justify-between">
                <a href="#" class="-m-1.5 p-1.5">
                    <span class="sr-only">SXYA Community</span>
                    <img class="h-8 w-auto" src={logo} alt=""/>
                </a>
                {#if mobileMenuOpen}
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-hue11"
                            on:click={() => (mobileMenuOpen = false)}>
                        <span class="sr-only">{$_('navigation.close')}</span>
                        <Icon icon="tabler:x" class="h-6 w-6" aria-hidden="true"/>
                    </button>
                {/if}
            </div>
            <div class="mt-6 flow-root">
                <div class="-my-6">
                    <div class="space-y-2 py-6">
                        {#each navigation as item (item.name)}
                            {#if item.type === 'pure'}
                                <a href={item.href}
                                   class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-hue12 hover:bg-hue2">
                                    {$_(item.name)}
                                </a>
                            {:else if (item.type === 'flyout')}
                                <Disclosure as="div" class="-mx-3" let:open>
                                    <DisclosureButton
                                            class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-hue12 hover:bg-hue2">
                                        {$_(item.name)}
                                        <Icon icon="tabler:chevron-down" aria-hidden="true"
                                              class="h-5 w-5 flex-none text-hue11 {open ? 'rotate-180' : ''}"/>
                                    </DisclosureButton>
                                    <DisclosurePanel class="mt-2 space-y-2">
                                        {#each item.flyout.items as sub_item (sub_item.name)}
                                            <DisclosureButton as="a" href={sub_item.href}
                                                              class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-hue12 hover:bg-hue2">
                                                {$_(sub_item.name)}
                                            </DisclosureButton>
                                        {/each}
                                    </DisclosurePanel>
                                </Disclosure>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</header>
