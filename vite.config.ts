import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { exec } from 'child_process';
import { promisify } from 'util';
import { imagetools } from '@zerodevx/svelte-img/vite';

// get project name from package.json
import { name } from './package.json';
import { watch } from 'vite-plugin-watch';

// get current tag/commit and last commit date from git
const pexec = promisify(exec);
const [version, lastmod] = (
	await Promise.allSettled([
		pexec('git describe --tags || git rev-parse --short HEAD'),
		pexec('git log -1 --format=%cd --date=format:"%Y-%m-%d %H:%M"')
	])
).map((v) => {
	if (v.status !== 'rejected') {
		return JSON.stringify(v.value?.stdout.trim());
	}
	return JSON.stringify('unknown');
});

export default defineConfig(({ command }) => ({
	plugins: [
		sveltekit(),
		imagetools(),

		watch({
			pattern: 'i18n/*.json',
			command: 'pnpm run i18n:compile'
		}),

		{
			name: 'compile-i18n',
			async buildStart() {
				if (command == 'build') {
					await pexec('pnpm run i18n:compile');
				}
			}
		}
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		__VERSION__: version,
		__LASTMOD__: lastmod,
		__APPNAME__: JSON.stringify(name)
	}
}));
