<script lang="ts">
	import { cfAi } from '$lib/shared/cloudflare';
	import TextArea from '$lib/shared/shared/components/textarea/TextArea.svelte';
	import Button from '$lib/shared/shared/components/button/Button.svelte';
	import Card from '$lib/shared/shared/components/card/Card.svelte';
	import SimpleHeroSection from '$lib/shared/shared/components/section/SimpleHeroSection.svelte';
	import { error } from '@sveltejs/kit';
	import Section from '$lib/shared/shared/components/section/Section.svelte';

	let prompt = '';
	let resp = '';

	const ask = async () => {
		if (!prompt || prompt.length < 1) {
			return;
		}

		const resps = await cfAi().ask(prompt);
		if (resps.isErr()) {
			throw error(resps.error.code, resps.error.message);
		}
		if (resps.value.error) {
			throw error(500, JSON.stringify(resps.value.error));
		}
		resp = resps.value.data || 'No response';
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
		{resp || 'AI response will appear here...'}
	</Card>
</Section>
