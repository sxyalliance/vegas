import { superValidate } from 'sveltekit-superforms/server';

import { formSchema } from './schema';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		form: superValidate(formSchema)
	};
};
