import {writable} from "svelte/store";

function createTitle() {
  const {subscribe, set} = writable('')

  return {
    subscribe,
    set: (title: string) => {
      set(`${title} - SXYA Community`)
    },
    reset: () => {
      set('SXYA Community')
    }
  }
}

export const title = createTitle()
