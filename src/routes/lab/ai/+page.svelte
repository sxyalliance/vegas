<script lang="ts">
	import { page } from '$app/stores';

	import SimpleHeroSection from '$lib/shared/shared/components/SimpleHeroSection.svelte';
	import { trpc } from '$lib/trpc/client';
	import Button from '$lib/vgui/button/Button.svelte';
	import Card from '$lib/vgui/card/Card.svelte';
	import Section from '$lib/vgui/section/Section.svelte';
	import TextArea from '$lib/vgui/textarea/TextArea.svelte';

	let prompt = '';
	const mutation = trpc($page).ask.createMutation();

	const ask = async () => {
		if (!prompt || prompt.length < 1) {
			return;
		}

		$mutation.mutate(prompt);
	};
</script>

<SimpleHeroSection title="SXYA AI">
	This is a Large Language Model (LLM) based on Meta's Quantized Llama 2 chat model. We put it here
	for testing purposes. Conversation history nor session is saved.
</SimpleHeroSection>

<Section width="xl">
	<TextArea bind:value={prompt} name="prompt" placeholder="Ask AI something?" required />

	<div class="flex justify-end">
		<Button on:click={ask} class="my-4">Ask</Button>
	</div>

	<Card class="text-low-contrast">
		{#if $mutation.isLoading}
			Thinking 🤔
		{:else if $mutation.isError}
			Oh no, my mind is blank 😵
		{:else if $mutation.isSuccess}
			{$mutation.data}
		{:else}
			Ask me something!
		{/if}
	</Card>
</Section>
