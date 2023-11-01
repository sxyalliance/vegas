<script lang="ts">
	import { HomeSeoFactory } from '$lib/shared/seo/factory/home';
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';

	import DictionarySection from './DictionarySection.svelte';
	import HeroSection from './HeroSection.svelte';
	import MemberSection from './MemberSection.svelte';
	import ProcedureSection from './ProcedureSection.svelte';
</script>

<SeoHandler factory={new HomeSeoFactory()} />

<main>
	<HeroSection />

	<MemberSection />

	<ProcedureSection alternate />

	<DictionarySection />
</main>
