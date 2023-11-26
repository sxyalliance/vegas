<script lang="ts">
	import * as Button from '$lib/vgui/components/ui/button';
	import { cn } from '$lib/vgui/utils';
	type $$Props = Button.Props;
	type $$Events = Button.Events;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<Button.Root type="submit" {...$$restProps} on:click on:keydown class={cn('mt-4', className)}>
	<slot />
</Button.Root>
