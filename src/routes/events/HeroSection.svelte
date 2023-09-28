<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import { CategoryKey } from '$lib/types/event';
	import { getCategoryByKey } from '$lib/event';

	function gridConfigOf(categoryKey: CategoryKey, code: string) {
		const category = getCategoryByKey(categoryKey);
		return {
			code,
			key: category.key,
			icon: category.icon,
			color: category.color
		};
	}

	const gridSchema = [
		[gridConfigOf(CategoryKey.DINING, '01'), gridConfigOf(CategoryKey.ENTERTAINMENT, '02')],
		[{ code: null }, gridConfigOf(CategoryKey.ACADEMIC, '03'), { code: null }],
		[gridConfigOf(CategoryKey.SPORT, '04'), gridConfigOf(CategoryKey.GIVEAWAY, '05')]
	];
</script>

<div class="isolate lg:h-screen overflow-hidden bg-hue2 relative mt-20 lg:mt-0">
	<div class="pb-12 pt-16 lg:pb-48 lg:pt-40 sm:pb-40 sm:pt-24">
		<div class="relative mx-auto max-w-7xl px-4 sm:static lg:px-8 sm:px-6">
			<div class="sm:max-w-lg">
				<h1 class="font text-4xl font-extrabold tracking-tight text-hue12 sm:text-6xl">
					{$_('event.list.hero.title')}
				</h1>
				<p class="mt-4 text-xl text-hue11">
					{$_('event.list.hero.text')}
				</p>
			</div>
			<div class="hidden md:block">
				<div class="mt-10">
					<div
						aria-hidden="true"
						class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:max-w-7xl lg:w-full"
					>
						<div
							class="absolute transform lg:left-1/2 lg:top-1/2 sm:left-1/2 sm:top-0 lg:translate-x-8 sm:translate-x-8 lg:-translate-y-1/2"
						>
							<div class="flex items-center space-x-6 lg:space-x-8">
								{#each gridSchema as grid}
									<div class="grid grid-cols-1 flex-shrink-0 gap-y-6 lg:gap-y-8">
										{#each grid as category, i (i)}
											{#if category.code === null}
												<div class="h-64 w-44 overflow-hidden rounded-lg" />
											{:else}
												<div class="h-64 w-44 overflow-hidden rounded-lg shadow">
													<div class="h-full w-full overflow-hidden rounded-lg bg-hue1">
														<div class="px-2 py-3 sm:p-4">
															<div class="relative mb-4">
																<div class="absolute inset-0 flex items-center" aria-hidden="true">
																	<div class="w-full border-t border-hue6" />
																</div>
																<div class="relative flex justify-start">
																	<span class="bg-hue1 pr-3 text-sm font-medium text-hue10">
																		{category.code}
																	</span>
																</div>
															</div>

															<Icon icon={category.icon} class="mb-4 h-12 w-12 {category.color}" />

															<h2 class="text-lg font-medium leading-6 text-hue12">
																{$_(`event.category.${category.key}.name`)}
															</h2>
															<p class="mt-2 text-base text-hue11">
																{$_(`event.category.${category.key}.description`)}
															</p>
														</div>
													</div>
												</div>
											{/if}
										{/each}
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
