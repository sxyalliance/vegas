import { get, writable } from 'svelte/store';
import type { Updater } from 'svelte/store';
import { browser } from '$app/environment';

export function storable<T>(data: T | undefined, key: string) {
	let initValue = data;
	if (storageAvailable()) {
		const saved = localStorage.getItem(key);
		if (saved) {
			initValue = JSON.parse(saved);
		}
	}

	const store = writable(initValue);
	const { subscribe, set } = store;

	return {
		subscribe,
		set: (n: T) => {
			storageAvailable() && localStorage.setItem(key, JSON.stringify(n));
			set(n);
		},
		update: (cb: Updater<T>) => {
			const updatedStore = cb(get(store));

			storageAvailable() && localStorage.setItem(key, JSON.stringify(updatedStore));
			set(updatedStore);
		}
	};
}

function storageAvailable() {
	if (!browser) {
		return false;
	}

	try {
		const storage = window.localStorage,
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return false;
	}
}
