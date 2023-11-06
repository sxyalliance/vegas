// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// noinspection ES6ConvertVarToLetConst

import type { ConstructedDirectusClient } from '$lib/shared/directus/client';

import type { LoggerType } from 'roarr';

declare global {
	namespace App {
		// interface Error {
		// 	status: number;
		// }
		interface Locals {
			directus: ConstructedDirectusClient;
			user: { id?: string };
		}
		// interface PageData {}
		// interface Platform {}
	}

	// eslint-disable-next-line no-var
	var ROARR: LoggerType;
}

export {};
