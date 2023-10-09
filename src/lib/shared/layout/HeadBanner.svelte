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
		class:bg-accent-9={type === 'primary'}
		class:bg-info-9={type === 'info'}
		class:bg-success-9={type === 'success'}
		class:bg-warning-9={type === 'warning'}
		class:bg-danger-9={type === 'error'}
		class:text-accent-12={type === 'primary'}
		class:text-info-12={type === 'info'}
		class:text-success-12={type === 'success'}
		class:text-warning-12={type === 'warning'}
		class:text-danger-12={type === 'error'}
	>
		<div
			class="mx-auto flex max-w-7xl items-center gap-x-6 overflow-hidden whitespace-nowrap px-6 py-2.5 sm:px-8"
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
