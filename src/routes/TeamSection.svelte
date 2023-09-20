<script>
	import demo from '$lib/assets/home_team_demo.png';
	import { _ } from 'svelte-i18n';
</script>

<!-- Team section -->
<div class="sm:pb-8">
	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div
			class="relative overflow-hidden bg-gray-900 px-6 py-8 shadow-xl sm:rounded-3xl sm:px-10 sm:py-12 md:px-12 lg:px-20"
		>
			<!-- Background -->
			<img class="absolute inset-0 h-full w-full object-cover brightness-50" src={demo} alt="" />
			<div class="relative mx-auto max-w-2xl lg:mx-0">
				<!-- Heading -->
				<h2 class="text-2xl font-bold text-white">{$_('home.team.title')}</h2>
				<p class="mb-6 text-gray-200">{$_('home.team.text')}</p>

				<!-- Member profile -->
				<div class="relative md:h-[220px]">
					<div class="">
						<div class="font-bold font-bold mb-2 flex flex-col md:flex-row items-center">
							<div class="text-xl text-indigo-300 mb-1 md:mb-0 sm:mr-3">Someone</div>
							<div class="badge-flat-indigo mb-2 md:mb-0">Someone's title</div>
						</div>
						<p class="text-lg text-gray-300 font-medium">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit quam quis
							ullamcorper luctus. Proin pharetra consequat ligula, et efficitur arcu aliquam at. Sed
							ac venenatis sem. Etiam vel risus vestibulum, sodales lectus ac, commodo est.
							Vestibulum efficitur dui dui. Fusce bibendum velit eu nisl ornare iaculis. Curabitur
							convallis sapien sit amet est gravida, nec fermentum ante convallis. Aliquam non
							efficitur sapien.
						</p>
					</div>
				</div>

				<!-- Member avatars -->
				<div class="h-14 relative w-56 md:w-96 w-full flex items-center justify-between">
					<div class="flex items-center absolute overflow-hidden inset-0">
						<div class="flex relative transition-transform" style="transform: translateX(0px);">
							<button class="w-10 relative"
								><img
									src="https://mc-heads.net/avatar/MHF_Steve"
									alt=""
									class="rounded-sm w-8 h-8"
								/>
							</button>
							<button class="w-10 relative"
								><img
									src="https://mc-heads.net/avatar/MHF_Alex"
									alt=""
									class="rounded-sm w-8 h-8 transition-transform translate-y-2"
								/>
							</button>
							<button class="w-10 relative"
								><img
									src="https://mc-heads.net/avatar/sunxyw"
									alt=""
									class="rounded-sm w-8 h-8 transition-transform translate-y-2"
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
