<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { paramCase } from 'change-case';

	import { _ } from '$lib/shared/i18n';
	import Card from '$lib/vgui/card/Card.svelte';

	import { queryCategories } from './query';

	const categories = createQuery({
		queryKey: ['categories'],
		queryFn: () => queryCategories()
	});

	type GridItem = Awaited<ReturnType<typeof queryCategories>>[number] & {
		display?: boolean;
	};

	const groupCategories = (categories: GridItem[]) => {
		return [
			[categories[0], categories[1]],
			[{ ...categories[2], display: false }, categories[2], { ...categories[2], display: false }],
			[categories[3], categories[4]]
		];
	};
</script>

<div class="lg:h-hero relative isolate overflow-hidden bg-neutral-2 lg:mt-0">
	<div class="pb-12 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
		<div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
			<div class="sm:max-w-lg">
				<h1 class="font text-4xl font-extrabold tracking-tight text-high-contrast sm:text-6xl">
					{_('event_list_hero_title')}
				</h1>
				<p class="mt-4 text-xl text-low-contrast">
					{_('event_list_hero_text')}
				</p>
			</div>
			<div class="hidden lg:block">
				<div class="mt-10">
					<div
						aria-hidden="true"
						class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
					>
						<div
							class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:translate-x-8"
						>
							<div class="flex items-center space-x-6 lg:space-x-8">
								{#if $categories.isSuccess}
									{#each groupCategories($categories.data) as grid}
										<div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
											{#each grid as category, i (i)}
												{#if category.display === false}
													<div class="h-56 w-44 overflow-hidden rounded-lg" />
												{:else}
													<div class="h-56 w-44 overflow-hidden rounded-lg shadow">
														<Card variant="surface" class="h-full w-full overflow-hidden">
															<div class="px-2 py-3 sm:p-4">
																<Icon
																	icon={`material-symbols:${paramCase(String(category.icon))}`}
																	class="mb-4 h-12 w-12 text-{category.color}"
																/>

																<h2 class="text-lg font-medium leading-6 text-high-contrast">
																	{_(`event_category_${category.key}_name`)}
																</h2>
																<p class="mt-2 text-base text-low-contrast">
																	{_(`event_category_${category.key}_description`)}
																</p>
															</div>
														</Card>
													</div>
												{/if}
											{/each}
										</div>
									{/each}
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="absolute bottom-0 left-0 right-0 -z-10 hidden h-[50vh] lg:block">
		<svg
			viewBox="0 0 1440 390"
			xmlns="http://www.w3.org/2000/svg"
			class="transition delay-150 duration-300 ease-in-out"
		>
			<defs>
				<linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
					<stop offset="5%" stop-color="#F78DA7" />
					<stop offset="95%" stop-color="#8ED1FC" />
				</linearGradient>
			</defs>
			<path
				d="M 0,400 C 0,400 0,100 0,100 C 78.48803827751195,108.69856459330143 156.9760765550239,117.39712918660287 261,118 C 365.0239234449761,118.60287081339713 494.58373205741634,111.11004784688996 609,115 C 723.4162679425837,118.88995215311004 822.6889952153113,134.16267942583733 908,131 C 993.3110047846887,127.83732057416269 1064.6602870813397,106.23923444976076 1151,98 C 1237.3397129186603,89.76076555023924 1338.6698564593303,94.88038277511961 1440,100 C 1440,100 1440,400 1440,400 Z"
				stroke="none"
				stroke-width="0"
				fill="url(#gradient)"
				fill-opacity="0.4"
				class="path-0 transition-all delay-150 duration-300 ease-in-out"
			/>
			<defs>
				<linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
					<stop offset="5%" stop-color="#F78DA7" />
					<stop offset="95%" stop-color="#8ED1FC" />
				</linearGradient>
			</defs>
			<path
				d="M 0,400 C 0,400 0,200 0,200 C 97.64593301435409,181.46411483253587 195.29186602870817,162.92822966507177 288,164 C 380.70813397129183,165.07177033492823 468.47846889952154,185.7511961722488 569,187 C 669.5215311004785,188.2488038277512 782.7942583732058,170.06698564593302 877,171 C 971.2057416267942,171.93301435406698 1046.3444976076555,191.98086124401914 1137,200 C 1227.6555023923445,208.01913875598086 1333.8277511961724,204.00956937799043 1440,200 C 1440,200 1440,400 1440,400 Z"
				stroke="none"
				stroke-width="0"
				fill="url(#gradient)"
				fill-opacity="0.53"
				class="path-1 transition-all delay-150 duration-300 ease-in-out"
			/>
			<defs>
				<linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
					<stop offset="5%" stop-color="#F78DA7" />
					<stop offset="95%" stop-color="#8ED1FC" />
				</linearGradient>
			</defs>
			<path
				d="M 0,400 C 0,400 0,300 0,300 C 122.77511961722487,300.7942583732057 245.55023923444975,301.58851674641147 335,290 C 424.44976076555025,278.41148325358853 480.57416267942585,254.44019138755982 571,263 C 661.4258373205741,271.5598086124402 786.153110047847,312.6507177033493 880,314 C 973.846889952153,315.3492822966507 1036.8133971291866,276.9569377990431 1125,268 C 1213.1866028708134,259.0430622009569 1326.5933014354068,279.52153110047846 1440,300 C 1440,300 1440,400 1440,400 Z"
				stroke="none"
				stroke-width="0"
				fill="url(#gradient)"
				fill-opacity="1"
				class="path-2 transition-all delay-150 duration-300 ease-in-out"
			/>
		</svg>
	</div>
</div>
