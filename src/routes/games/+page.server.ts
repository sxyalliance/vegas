import { fail } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

import { superValidate } from 'sveltekit-superforms/server';

import { z } from 'zod';

import type { Actions } from './$types';

const formSchema = z.object({
	game_id: z.number(),
	vote: z.enum(['upvote', 'downvote'])
});

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, formSchema);
		if (!form.valid) {
			return fail(400, { form });
		}

		const session = await event.locals.getSession();
		if (!session) {
			setFlash({ type: 'error', message: 'You must be logged in to vote.' }, event);
			return fail(401);
		}
		const {
			user: { id: user_id }
		} = session;

		const { error } = await event.locals.supabase.from('game_votes').upsert({
			game_id: form.data.game_id,
			voter_id: user_id,
			is_upvote: form.data.vote === 'upvote'
		});

		if (error) {
			setFlash({ type: 'error', message: 'There was an error saving your vote.' }, event);
			return fail(400, { form });
		}

		setFlash({ type: 'success', message: 'Your vote has been noted.' }, event);
	}
};
