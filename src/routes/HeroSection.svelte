<script>
	import { _ } from 'svelte-i18n';
	import { FxParallax as Img } from '@zerodevx/svelte-img';

	import cover from '$lib/assets/home_hero_cover-e.png?as=run:48&blur=30';
</script>

<!-- Hero section -->
<div class="relative isolate h-screen overflow-hidden bg-hue1">
	<div
		class="absolute inset-x-0 transform-gpu overflow-hidden blur-3xl -z-10 sm:-top-40"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] rotate-[30deg] from-[#ff80b5] to-[#9089fc] bg-gradient-to-tr opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] -translate-x-1/2"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		/>
	</div>
	<div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
		<div class="px-6 pb-12 pt-10 lg:col-span-6 xl:col-span-5 lg:px-0 lg:pb-56 lg:pt-48 sm:pb-32">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<div class="hidden sm:flex">
					<div
						class="relative rounded-full px-3 py-1 text-sm leading-6 text-hue11 ring-1 ring-hue7 hover:ring-hue8"
					>
						{$_('home.hero.tagline')}
						<a href="#" class="whitespace-nowrap font-semibold text-primary10">
							<span class="absolute inset-0" aria-hidden="true" />
							{$_('home.hero.tagline_link')}
							<span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</div>
				<h1 class="mt-24 text-4xl font-bold tracking-tight text-hue12 sm:mt-10 sm:text-6xl">
					<span class="bg-rainbow bg-clip-text text-transparent">
						{$_('home.hero.title')}
					</span>
				</h1>
				<p class="mt-6 text-lg leading-8 text-hue11">
					{$_('home.hero.text')}
				</p>
				<div class="mt-10 flex items-center gap-x-6">
					<a href="#" class="btn-xl btn-primary">
						{$_('home.hero.primary_action')}
					</a>
					<a href="#" class="text-sm font-semibold leading-6 text-hue12">
						{$_('home.hero.secondary_action')}
						<span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
		<div
			class="relative xl:absolute xl:inset-0 xl:left-1/2 lg:col-span-6 xl:mr-0 lg:pt-20 lg:-mr-8"
		>
			<Img
				class="aspect-[3/2] w-full bg-hue1 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
				src={cover}
				alt="Group of SXYA Members"
				factor={0.95}
			/>
		</div>
	</div>
</div>
