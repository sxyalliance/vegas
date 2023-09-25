// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			status: number;
		}

		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

// App version
declare const __VERSION__: string;
// Last commit date
declare const __LASTMOD__: string;
