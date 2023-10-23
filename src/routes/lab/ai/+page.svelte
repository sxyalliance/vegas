<script lang="ts">
	import { cfAi } from '$lib/shared/cloudflare';
	import TextArea from '$lib/shared/shared/components/textarea/TextArea.svelte';
	import Button from '$lib/shared/shared/components/button/Button.svelte';
	import Card from '$lib/shared/shared/components/card/Card.svelte';

	let prompt = '';
	let resp = '';

	const ask = async () => {
		if (!prompt || prompt.length < 1) {
			return;
		}

		resp = await cfAi().ask(prompt);
	};
</script>

<div class="bg-neutral-2 px-6 py-12 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-4xl font-bold tracking-tight text-high-contrast sm:text-6xl">SXYA AI</h2>
		<p class="mt-6 text-lg leading-8 text-low-contrast">
			This is a Large Language Model (LLM) based on Meta's Quantized Llama 2 chat model. We put it
			here for testing purposes. Conversation history nor session is saved.
		</p>
	</div>
</div>

<div class="bg-neutral-1 px-6 py-12 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-xl">
		<TextArea bind:value={prompt} name="prompt" placeholder="Ask AI something?" required />

		<div class="flex justify-end">
			<Button on:click={ask} class="my-4">Ask</Button>
		</div>

		<Card class="text-low-contrast">
			{resp || 'AI response will appear here...'}
		</Card>
	</div>
</div>
