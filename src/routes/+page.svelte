<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import DictionarySection from './DictionarySection.svelte';
	import ProcedureSection from './ProcedureSection.svelte';
	import MemberSection from './MemberSection.svelte';
	import SeoHandler from '$lib/shared/shared/components/SeoHandler.svelte';
	import LogoLight from '$lib/assets/logo-light.png';
</script>

<SeoHandler
	metaTags={{
		title: 'Home',
		description:
			"If you're looking for conversation ideas, we could talk about hobbies, travel, current events, personal goals, pop culture, food, or career. Is there anything in particular that interests you?"
	}}
	jsonLd={{
		'@type': 'Organization',
		url: 'https://www.sxya.org',
		logo: LogoLight,
		foundingDate: new Date('2019-04-15').toISOString(),
		slogan:
			'The truth of the sea, and let not found to lie down in front of my eyes, all things for me to explore.'
	}}
/>

<main>
	<HeroSection />

	<MemberSection />

	<ProcedureSection alternate />

	<DictionarySection />
</main>
