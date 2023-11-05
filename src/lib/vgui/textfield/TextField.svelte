<script lang="ts">
	import { sentenceCase } from 'change-case';

	import type { FormEventHandler } from 'svelte/elements';

	export let type: 'text' | 'email' | 'password' = 'text';

	export let value: string;

	export let placeholder: string | undefined = undefined;

	export let name: string;

	const id = Math.random().toString(36).substring(2);

	const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
		value = (e?.target as HTMLInputElement).value;
	};

	let descId: string | null = null;

	$: if ($$slots.help) {
		descId = `${id}-description`;
	}
</script>

<label for={id} class="text-field-label">{sentenceCase(name)}</label>
<div class="mt-2">
	<input
		{type}
		{name}
		{id}
		class="text-field-input"
		{placeholder}
		{value}
		on:input={handleInput}
		aria-describedby={descId}
	/>
</div>
{#if $$slots.help}
	<p class="text-field-help" id={descId}>
		<slot name="help" />
	</p>
{/if}

<style lang="postcss">
	@import './textfield.pcss';
</style>
