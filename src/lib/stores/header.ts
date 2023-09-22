import { writable } from 'svelte/store';

function createHeaderState() {
	const { subscribe, set } = writable('');

	return {
		subscribe,
		set
	};
}

export const headerState = createHeaderState();
