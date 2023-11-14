<script lang="ts">
	import * as m from '$lib/shared/i18n/compiled/messages';
	import Section from '$lib/vgui/section/Section.svelte';
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
								{m[`home_procedure_steps_${i + 1}_name`]()}
							</p>
						</dt>
						<dd class="ml-9 mt-2 text-base text-muted-foreground">
							{m[`home_procedure_steps_${i + 1}_description`]()}
						</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</Section>
