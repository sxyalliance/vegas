import { exec } from 'child_process';
import { promisify } from 'util';

import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import { sitemapPlugin } from 'sveltekit-sitemap/dist/plugin';
import { plugin as mdPlugin, Mode as mdMode } from 'vite-plugin-markdown';
import { watch } from 'vite-plugin-watch';
import { defineConfig } from 'vitest/config';

import { name } from './package.json';

// get current tag/commit and last commit date from git
const pexec = promisify(exec);
const [versionTag, commitHash, lastModified] = (
	await Promise.allSettled([
		pexec('git describe --tags --dirty --always'),
		pexec('git rev-parse --short HEAD'),
		pexec('git log -1 --format=%cd --date=format:"%Y-%m-%d %H:%M"')
	])
).map((v) => {
	if (v.status !== 'rejected') {
		return v.value?.stdout.trim();
	}
	return null;
});

export default defineConfig(({ command }) => ({
	plugins: [
		sentrySvelteKit({
			autoInstrument: false, // reset when Sentry fixed issues with Cloudflare Page
			sourceMapsUploadOptions: {
				org: 'sxya',
				project: 'vegas'
			}
		}),
		sveltekit(),
		imagetools(),
		mdPlugin({ mode: [mdMode.HTML, mdMode.TOC] }),
		command === 'build' && sitemapPlugin(),

		watch({
			pattern: 'i18n/*.json',
			command: 'pnpm run i18n:compile'
		}),

		{
			name: 'compile-i18n',
			async buildStart() {
				if (command === 'build') {
					await pexec('pnpm run i18n:compile');
				}
			}
		}
	],
	optimizeDeps: {
		exclude: ['@inlang/paraglide-js']
	},
	server: {
		proxy: {
			'/apid': {
				target: 'https://apid.sxya.org',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/apid/, '')
			}
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		__APPNAME__: JSON.stringify(name),
		__VERSION__: JSON.stringify({
			tag: versionTag,
			hash: commitHash,
			date: lastModified
		})
	}
}));
