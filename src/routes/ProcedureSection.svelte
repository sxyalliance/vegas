<script lang="ts">
	import { _ } from '$lib/shared/i18n';
</script>

<section class="bg-neutral-2">
	<div
		class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:py-24"
	>
		<div>
			<h2 class="text-base font-semibold uppercase tracking-wide text-accent-11">
				{_('home_procedure_subtitle')}
			</h2>
			<p class="mt-2 text-3xl font-extrabold text-high-contrast">
				{_('home_procedure_title')}
			</p>
			<p class="mt-4 text-lg text-low-contrast">
				{_('home_procedure_text')}
			</p>
		</div>
		<div class="mt-12 lg:col-span-2 lg:mt-0">
			<dl
				class="space-y-10 sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3 sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8"
			>
				{#each { length: 6 } as x, i (i)}
					<div class="relative">
						<dt>
							<span class="absolute text-2xl text-accent-11">{i + 1}</span>
							<p class="ml-9 text-lg font-medium leading-6 text-high-contrast">
								{_(`home_procedure_steps_${i + 1}_name`)}
							</p>
						</dt>
						<dd class="ml-9 mt-2 text-base text-low-contrast">
							{_(`home_procedure_steps_${i + 1}_description`)}
						</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>
