<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import { categoryRepository } from '$lib/event/category/repository';

	async function gridConfigOf(categoryKey: string, code: string) {
		const category = await categoryRepository.findByPk(categoryKey);
		return {
			code,
			key: category.key,
			icon: category.icon,
			color: 'text-' + category.color
		};
	}

	const getGridSchema = async () => {
		return await Promise.all([
			Promise.all([gridConfigOf('dining', '01'), gridConfigOf('entertainment', '02')]),
			Promise.all([{ code: null }, gridConfigOf('academic', '03'), { code: null }]),
			Promise.all([gridConfigOf('sport', '04'), gridConfigOf('giveaway', '05')])
		]);
	};
</script>

<div class="isolate lg:h-screen overflow-hidden bg-neutral-2 relative mt-20 lg:mt-0">
	<div class="pb-12 pt-16 lg:pb-48 lg:pt-40 sm:pb-40 sm:pt-24">
		<div class="relative mx-auto max-w-7xl px-4 sm:static lg:px-8 sm:px-6">
			<div class="sm:max-w-lg">
				<h1 class="font text-4xl font-extrabold tracking-tight text-high-contrast sm:text-6xl">
					{$_('event.list.hero.title')}
				</h1>
				<p class="mt-4 text-xl text-low-contrast">
					{$_('event.list.hero.text')}
				</p>
			</div>
			<div class="hidden lg:block">
				<div class="mt-10">
					<div
						aria-hidden="true"
						class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:max-w-7xl lg:w-full"
					>
						<div
							class="absolute transform lg:left-1/2 lg:top-1/2 sm:left-1/2 sm:top-0 lg:translate-x-8 sm:translate-x-8 lg:-translate-y-1/2"
						>
							<div class="flex items-center space-x-6 lg:space-x-8">
								{#await getGridSchema() then gridSchema}
									{#each gridSchema as grid}
										<div class="grid grid-cols-1 flex-shrink-0 gap-y-6 lg:gap-y-8">
											{#each grid as category, i (i)}
												{#if category.code === null}
													<div class="h-64 w-44 overflow-hidden rounded-lg" />
												{:else}
													<div class="h-64 w-44 overflow-hidden rounded-lg shadow">
														<div class="h-full w-full overflow-hidden rounded-lg bg-neutral-1">
															<div class="px-2 py-3 sm:p-4">
																<div class="relative mb-4">
																	<div
																		class="absolute inset-0 flex items-center"
																		aria-hidden="true"
																	>
																		<div class="w-full border-t border-neutral-6" />
																	</div>
																	<div class="relative flex justify-start">
																		<span
																			class="bg-neutral-1 pr-3 text-sm font-medium text-accent-11"
																		>
																			{category.code}
																		</span>
																	</div>
																</div>

																<Icon
																	icon={category.icon}
																	class="mb-4 h-12 w-12 {category.color}"
																/>

																<h2 class="text-lg font-medium leading-6 text-high-contrast">
																	{$_(`event.category.${category.key}.name`)}
																</h2>
																<p class="mt-2 text-base text-low-contrast">
																	{$_(`event.category.${category.key}.description`)}
																</p>
															</div>
														</div>
													</div>
												{/if}
											{/each}
										</div>
									{/each}
								{/await}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="hidden lg:block absolute bottom-0 left-0 right-0 h-[50vh] -z-10">
		<svg
			viewBox="0 0 1440 390"
			xmlns="http://www.w3.org/2000/svg"
			class="transition duration-300 ease-in-out delay-150"
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
				class="transition-all duration-300 ease-in-out delay-150 path-0"
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
				class="transition-all duration-300 ease-in-out delay-150 path-1"
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
				class="transition-all duration-300 ease-in-out delay-150 path-2"
			/>
		</svg>
	</div>
</div>
