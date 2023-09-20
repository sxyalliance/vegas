<script>
	import HeroSection from './HeroSection.svelte';
	import DictionarySection from './DictionarySection.svelte';
	import ProcedureSection from './ProcedureSection.svelte';
	import MemberSection from './MemberSection.svelte';
	import { title } from '$lib/stores/title';

	title.set('Home');
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

	<DictionarySection />
</main>
