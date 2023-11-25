import cfAiT from '$lib/trpc/routes/cfai';
import game_store_resolve from '$lib/trpc/routes/game_store_resolve';
import { t } from '$lib/trpc/t';

export const router = t.router({
	...cfAiT,
	...game_store_resolve
});

export type Router = typeof router;
