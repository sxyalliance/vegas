import { preprocessMeltUI } from '@melt-ui/pp';
import sequence from 'svelte-sequential-preprocessor';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import("@sveltejs/kit").Config}*/
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([vitePreprocess(), mdsvex(mdsvexConfig), preprocessMeltUI()]),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'connect-src': [
					'self',
					'api.iconify.design',
					'discord.com',
					'content-sheets.googleapis.com',
					'*.sxya.org',
					'*.sentry.io',
					'sentry.io'
				]
			}
		}
	}
};
export default config;
