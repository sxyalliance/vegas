<script lang="ts">
	import DataUnavailableCallout from '$lib/shared/shared/components/DataUnavailableCallout.svelte';
	import SimpleHeroSection from '$lib/shared/shared/components/SimpleHeroSection.svelte';
	import Section from '$lib/vgui/section/Section.svelte';

	import ProposalForm from './ProposalForm.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<SimpleHeroSection title="Proposal a Game to Play" tagline="Let's play my game!!" />

<Section width="xl">
	<ProposalForm form={data.form} />
</Section>
