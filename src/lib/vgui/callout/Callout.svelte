<script lang="ts">
	import Icon from '@iconify/svelte';

	let clazz: string | false | null = null;
	export { clazz as class };

	export let type: 'success' | 'danger' | 'warning' | 'info' = 'info';

	const icons = {
		success: 'tabler:check-circle',
		danger: 'tabler:x-circle',
		warning: 'tabler:alert-triangle',
		info: 'tabler:info-circle'
	};
</script>

<div class="callout rounded-md p-4 {type} {clazz}" {...$$restProps}>
	<div class="flex">
		<div class="flex-shrink-0">
			<Icon icon={icons[type]} class="h-5 w-5" />
		</div>
		<div class="ml-3 flex-1 text-sm md:flex md:justify-between">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	@import 'callout.pcss';
</style>
