import { err } from 'neverthrow';

import { t } from '$lib/trpc/t';

export default {
	resolve: t.procedure
		.input((url: unknown) => {
			if (typeof url !== 'string') {
				throw new Error(`Invalid input: ${typeof url}`);
			}
			const match = url.match(/https:\/\/store\.steampowered\.com\/app\/(\d+)\/.*/);
			if (!match) {
				throw new Error(`Invalid input: ${url}`);
			}
			return match[1];
		})
		.mutation(async ({ input }) => {
			const result = await fetch(
				`https://store.steampowered.com/api/appdetails?appids=${input}&cc=hk`
			);
			if (!result.ok) {
				throw err({ code: result.status, message: result.statusText });
			}
			const json = await result.json();
			if (!json[input].success) {
				throw err({ code: 500, message: 'Steam API failed to respond' });
			}
			const data = json[input].data;
			return {
				name: data.name,
				provider: 'steam',
				provider_identifier: data.steam_appid,
				image_url: data.header_image,
				description: data.short_description
			};
		})
};
