<script lang="ts">
	import { browser } from '$app/environment';

	import Icon from '@iconify/svelte';

	import {
		getBrowserName,
		isSupported,
		isFullSupported
	} from '$lib/shared/layout/supportedBrowsers';

	let supported = true;
	let fullSupported = true;
	let browserName = '';
	if (browser) {
		supported = isSupported(window.navigator.userAgent);
		fullSupported = isFullSupported(window.navigator.userAgent);
		browserName = getBrowserName(window.navigator.userAgent);
	}

	let hide = false;
	$: show = !hide && (!supported || !fullSupported);
</script>

{#if show}
	<div class="bg-destructive text-destructive-foreground">
		<div
			class="mx-auto flex max-w-7xl items-center gap-x-6 overflow-hidden whitespace-nowrap px-6 py-2.5 sm:px-8"
		>
			<p class="text-sm leading-6">
				{#if !supported}
					<b class="capitalize">{browserName} is not supported.</b>
					<span class="hidden sm:inline"> We cannot guarantee a good experience. </span>
				{:else if !fullSupported}
					<b class="capitalize">{browserName} is not FULLY supported.</b>
					<span class="hidden sm:inline"> You may experience some minor issues. </span>
				{/if}
				<a class="ml-2" href="/about/faq"> Why? </a>
			</p>
			<div class="flex flex-1 justify-end">
				<button
					type="button"
					class="-m-3 p-3 focus-visible:outline-offset-[-4px]"
					on:click={() => (hide = true)}
				>
					<span class="sr-only">Dismiss</span>
					<Icon icon="lucide:x" class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
{/if}
