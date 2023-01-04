import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export function useStorage<T>(key: string, initialValue: T): Writable<T> {
	let storedValue: T = JSON.parse(localStorage.getItem(key))

	let store = writable(storedValue ? storedValue : initialValue)
	store.subscribe((value) => localStorage.setItem(key, JSON.stringify(value)))

	return store
}
