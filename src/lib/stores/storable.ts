import { get, writable } from 'svelte/store';
import type { Updater } from 'svelte/store';
import { browser } from '$app/environment';

export function storable<T>(data: T | undefined) {
	const store = writable(data);
	const { subscribe, set } = store;

	browser && localStorage.storable && set(JSON.parse(localStorage.storable));

	return {
		subscribe,
		set: (n: T) => {
			browser && (localStorage.storable = JSON.stringify(n));
			set(n);
		},
		update: (cb: Updater<T>) => {
			const updatedStore = cb(get(store));

			browser && (localStorage.storable = JSON.stringify(updatedStore));
			set(updatedStore);
		}
	};
}
