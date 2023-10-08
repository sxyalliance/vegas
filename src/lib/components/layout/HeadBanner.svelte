<script lang="ts">
	import Icon from '@iconify/svelte';
	import { portalAction } from 'svelte-legos';

	export let display = true;
	export let dismissible = true;
	export let type: 'primary' | 'info' | 'success' | 'warning' | 'error' = 'primary';
</script>

{#if display}
	<div
		use:portalAction={'#head-banner-holder'}
		class:bg-primary10={type === 'primary'}
		class:bg-info10={type === 'info'}
		class:bg-success10={type === 'success'}
		class:bg-warning10={type === 'warning'}
		class:bg-error10={type === 'error'}
		class:text-primary-fg={type === 'primary'}
		class:text-info-fg={type === 'info'}
		class:text-success-fg={type === 'success'}
		class:text-warning-fg={type === 'warning'}
		class:text-error-fg={type === 'error'}
	>
		<div
			class="flex mx-auto max-w-7xl items-center gap-x-6 px-6 py-2.5 sm:px-8 sm:before:flex-1 whitespace-nowrap overflow-hidden"
		>
			<p class="text-sm leading-6">
				<slot />
			</p>
			<div class="flex flex-1 justify-end">
				{#if dismissible}
					<button
						type="button"
						class="-m-3 p-3 focus-visible:outline-offset-[-4px]"
						on:click={() => (display = false)}
					>
						<span class="sr-only">Dismiss</span>
						<Icon icon="tabler:x" class="h-5 w-5" />
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
