<script lang="ts">
	import * as m from '$i18n/messages';
	import type { mMapRecord } from '$lib/shared/shared/i18n_utils';
	import Section from '$lib/vgui/section/Section.svelte';

	const mHomeProcedureStepsName: mMapRecord = {
		1: m.home_procedure_steps_1_name,
		2: m.home_procedure_steps_2_name,
		3: m.home_procedure_steps_3_name,
		4: m.home_procedure_steps_4_name,
		5: m.home_procedure_steps_5_name,
		6: m.home_procedure_steps_6_name
	};

	const mHomeProcedureStepsDescription: mMapRecord = {
		1: m.home_procedure_steps_1_description,
		2: m.home_procedure_steps_2_description,
		3: m.home_procedure_steps_3_description,
		4: m.home_procedure_steps_4_description,
		5: m.home_procedure_steps_5_description,
		6: m.home_procedure_steps_6_description
	};
</script>

<Section {...$$restProps}>
	<div class="lg:grid lg:grid-cols-3 lg:gap-x-8">
		<div>
			<h2 class="text-base font-semibold uppercase tracking-wide text-primary">
				{m.home_procedure_subtitle()}
			</h2>
			<p class="mt-2 text-3xl font-extrabold">
				{m.home_procedure_title()}
			</p>
			<p class="mt-4 text-lg text-muted-foreground">
				{m.home_procedure_text()}
			</p>
		</div>
		<div class="mt-12 lg:col-span-2 lg:mt-0">
			<dl
				class="space-y-10 sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3 sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8"
			>
				{#each [...Array(6).keys()] as i}
					<div class="relative">
						<dt>
							<span class="absolute text-2xl text-primary">{i + 1}</span>
							<p class="ml-9 text-lg font-medium leading-6">
								{mHomeProcedureStepsName[i + 1]()}
							</p>
						</dt>
						<dd class="ml-9 mt-2 text-base text-muted-foreground">
							{mHomeProcedureStepsDescription[i + 1]()}
						</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</Section>
