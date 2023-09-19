<script lang="ts">
  import {AvailablePreferences, themePreference, theme} from "$lib/stores/theme";
  import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@rgossiaux/svelte-headlessui";
  import Icon from "@iconify/svelte";
  import {browser} from "$app/environment";
  import va from "@vercel/analytics";

  const themeIcons: Record<typeof AvailablePreferences[number], string> = {
    'system': 'tabler:contrast',
    'light': 'tabler:sun',
    'dark': 'tabler:moon',
  }

  function activateDarkMode() {
    document.documentElement.classList.add('dark-theme')
  }

  function deactivateDarkMode() {
    document.documentElement.classList.remove('dark-theme')
  }

  theme.subscribe((value) => {
    if (!browser) {
      return
    }

    if (value === 'dark') {
      activateDarkMode()
    } else if (value === 'light') {
      deactivateDarkMode()
    }

    va.track('ChangeTheme', {
      theme: value
    })
  })
</script>

<Listbox bind:value={$themePreference}>
    <div class="absolute w-36 top-0">
        <ListboxButton
                class="relative w-full cursor-pointer rounded-b-md bg-hue1 py-1.5 pl-3 pr-10 text-left text-hue12 sm:text-sm sm:leading-6">
            <span class="flex items-center">
                <Icon icon={themeIcons[$themePreference]} class="h-5 w-5 flex-shrink-0"/>
                <span class="ml-3 block truncate capitalize">{$themePreference}</span>
            </span>
            <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <Icon icon="tabler:selector" class="h-5 w-5 text-hue10"/>
            </span>
        </ListboxButton>

        <ListboxOptions
                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-hue1 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {#each AvailablePreferences as option (option)}
                <ListboxOption value={option} let:selected let:active>
                    <li class="relative cursor-pointer select-none py-2 pl-3 pr-9 {active ? 'bg-primary10 text-primary-fg' : 'text-hue12'}">
                        <div class="flex items-center">
                            <Icon icon={themeIcons[option]} class="h-5 w-5 flex-shrink-0"/>
                            <span class="ml-3 block truncate capitalize {selected ? 'font-semibold' : 'font-normal'}">
                                {option}
                            </span>
                        </div>

                        {#if selected}
                            <span class="absolute inset-y-0 right-0 flex items-center pr-4 {active ? 'text-hue1' : 'text-primary10'}">
                                <Icon icon="tabler:check" class="h-5 w-5"/>
                            </span>
                        {/if}
                    </li>
                </ListboxOption>
            {/each}
        </ListboxOptions>
    </div>
</Listbox>
