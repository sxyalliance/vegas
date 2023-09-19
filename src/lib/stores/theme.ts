import {storable} from "./storable";
import {createMediaStore} from "svelte-media-queries/components/MediaQuery.svelte";
import {onDestroy} from "svelte";
import {get} from "svelte/store";

const availableThemes = ['light', 'dark'] as const
const defaultTheme = 'system' as const

export const AllowedOptions = ['system', ...availableThemes] as const

export type ThemeOptions = typeof AllowedOptions[number]

function createTheme() {
  const {subscribe, set} = storable<ThemeOptions>(defaultTheme)

  return {
    subscribe,
    set: (theme: ThemeOptions) => {
      if (AllowedOptions.includes(theme)) {
        set(theme)
      }
    },
  }
}

export const theme = createTheme()
