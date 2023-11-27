<script lang="ts">
	import { page } from '$app/stores';

	import SimpleHeroSection from '$lib/shared/shared/components/SimpleHeroSection.svelte';
	import { trpc } from '$lib/trpc/client';
	import { Button } from '$lib/vgui/components/ui/button';
	import * as Card from '$lib/vgui/components/ui/card';
	import { Textarea } from '$lib/vgui/components/ui/textarea';
	import Section from '$lib/vgui/section/Section.svelte';

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
	<Textarea bind:value={prompt} placeholder="Ask AI something?" />

	<div class="flex justify-end">
		<Button on:click={ask} class="my-4">Ask</Button>
	</div>

	<Card.Root>
		<Card.Content>
			{#if $mutation.isLoading}
				Thinking 🤔
			{:else if $mutation.isError}
				Oh no, my mind is blank 😵
			{:else if $mutation.isSuccess}
				{$mutation.data}
			{:else}
				Ask me something!
			{/if}
		</Card.Content>
	</Card.Root>
</Section>
