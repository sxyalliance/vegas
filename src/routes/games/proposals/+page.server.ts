import { fail } from '@sveltejs/kit';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import { message, setError, superValidate } from 'sveltekit-superforms/server';

import { formSchema } from './schema';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = () => {
	return {
		form: superValidate(formSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, formSchema);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await event.locals.supabase.from('games').insert(form.data);
		console.log(error);

		if (error) {
			setFlash({ type: 'error', message: 'There was an error saving your game proposal.' }, event);
			return fail(400, { form });
		}

		throw redirect(
			303,
			'/games',
			{ type: 'success', message: 'Your game proposal has been recorded.' },
			event
		);
	}
};
