<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import DictionarySection from './DictionarySection.svelte';
	import ProcedureSection from './ProcedureSection.svelte';
	import MemberSection from './MemberSection.svelte';
	import { title } from '$lib/shared/shared/title';
	import type { PageData } from './$types';
	import { deserialize } from 'serializr';
	import { Phrase } from '$lib/dictionary/phrase/phrase.js';

	export let data: PageData;

	title.set('Home');

	const randomPhrases = deserialize(Phrase, data.randomPhrases);
</script>

<svelte:head>
	<meta
		name="description"
		content="If you're looking for conversation ideas, we could talk about hobbies, travel, current events, personal goals, pop culture, food, or career. Is there anything in particular that interests you?"
	/>
</svelte:head>

<main>
	<HeroSection />

	<MemberSection />

	<ProcedureSection />

	<DictionarySection phrases={randomPhrases} />
</main>
