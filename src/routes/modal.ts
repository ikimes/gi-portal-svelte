import { type Writable, writable } from 'svelte/store'

export function modalStore(initial: boolean) {
  const isOpen: Writable<boolean> = writable(initial)
  const { set, update } = isOpen
  return {
    isOpen,
    open: () => set(true),
    close: () => set(false),
    toggle: () => update((n) => !n),
  }
}