// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// noinspection ES6ConvertVarToLetConst

import type { ConstructedDirectusClient } from '$lib/shared/directus/client';
import type { LoggerType } from 'roarr';
import type { Seo } from '$lib/shared/shared/seo';

declare global {
	namespace App {
		// interface Error {
		// 	status: number;
		// }
		interface Locals {
			directus: ConstructedDirectusClient;
		}

		interface PageData {
			seo: Seo;
		}
		// interface Platform {}
	}

	// eslint-disable-next-line no-var
	var ROARR: LoggerType;
}

export {};
