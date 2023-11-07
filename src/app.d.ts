// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// noinspection ES6ConvertVarToLetConst

import type { ConstructedDirectusClient } from '$lib/shared/directus/client';

import type { SupabaseBrowserClient } from '$lib/shared/supabase/client';

import type { Session } from '@supabase/supabase-js';
import type { LoggerType } from 'roarr';

declare global {
	namespace App {
		// interface Error {
		// 	status: number;
		// }
		interface Locals {
			directus: ConstructedDirectusClient;

			supabase: SupabaseBrowserClient;
			getSession: () => Promise<Session | null>;
		}
		// interface PageData {}
		// interface Platform {}
	}

	// eslint-disable-next-line no-var
	var ROARR: LoggerType;
}

export {};
