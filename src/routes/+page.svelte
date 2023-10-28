<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import DictionarySection from './DictionarySection.svelte';
	import ProcedureSection from './ProcedureSection.svelte';
	import MemberSection from './MemberSection.svelte';
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';
	import { HomeSeoFactory } from '$lib/shared/seo/factory/home';
</script>

<SeoHandler factory={new HomeSeoFactory()} />

<main>
	<HeroSection />

	<MemberSection />

	<ProcedureSection alternate />

	<DictionarySection />
</main>
