// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { ConstructedDirectusClient } from '$lib/shared/directus/client';

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
