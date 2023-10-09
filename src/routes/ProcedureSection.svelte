<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<section class="bg-neutral-2">
	<div
		class="mx-auto max-w-7xl px-4 py-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:py-24 sm:px-6"
	>
		<div>
			<h2 class="text-base font-semibold tracking-wide uppercase text-accent-11">
				{$_('home.procedure.subtitle')}
			</h2>
			<p class="mt-2 text-3xl font-extrabold text-high-contrast">
				{$_('home.procedure.title')}
			</p>
			<p class="mt-4 text-lg text-low-contrast">
				{$_('home.procedure.text')}
			</p>
		</div>
		<div class="mt-12 lg:col-span-2 lg:mt-0">
			<dl
				class="sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3 lg:gap-x-8 sm:gap-x-6 sm:gap-y-10 space-y-10 sm:space-y-0"
			>
				{#each { length: 6 } as x, i (i)}
					<div class="relative">
						<dt>
							<span class="absolute text-2xl text-accent-11">{i + 1}</span>
							<p class="ml-9 text-lg font-medium leading-6 text-high-contrast">
								{$_(`home.procedure.steps.${i + 1}.name`)}
							</p>
						</dt>
						<dd class="ml-9 mt-2 text-base text-low-contrast">
							{$_(`home.procedure.steps.${i + 1}.description`)}
						</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>
