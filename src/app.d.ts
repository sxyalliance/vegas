// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { ConstructedDirectusClient } from "$lib/shared/shared/directus";

declare global {
	namespace App {
		// interface Error {
		// 	status: number;
		// }
		interface Locals {
			directus: ConstructedDirectusClient;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

// App version
declare const __VERSION__: string;
// Last commit date
declare const __LASTMOD__: string;
// App name
declare const __APPNAME__: string;
