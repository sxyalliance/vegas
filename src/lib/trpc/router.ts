import cfAiT from '$lib/trpc/routes/cfai';
import { t } from '$lib/trpc/t';

export const router = t.router({
	...cfAiT
});

export type Router = typeof router;
