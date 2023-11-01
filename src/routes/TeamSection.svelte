<script>
	import { _ } from 'svelte-i18n';

	import demo from '$lib/assets/home_team_demo.png';
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
					<div>
						<div class="mb-2 flex flex-col items-center font-bold font-bold md:flex-row">
							<div class="mb-1 text-xl text-indigo-300 sm:mr-3 md:mb-0">Someone</div>
							<div class="badge-flat-indigo mb-2 md:mb-0">Someone's title</div>
						</div>
						<p class="text-lg font-medium text-gray-300">
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
				<div class="relative flex h-14 w-56 w-full items-center justify-between md:w-96">
					<div class="absolute inset-0 flex items-center overflow-hidden">
						<div class="relative flex transition-transform" style="transform: translateX(0px);">
							<button class="relative w-10"
								><img
									src="https://mc-heads.net/avatar/MHF_Steve"
									alt=""
									class="h-8 w-8 rounded-sm"
								/>
							</button>
							<button class="relative w-10"
								><img
									src="https://mc-heads.net/avatar/MHF_Alex"
									alt=""
									class="h-8 w-8 translate-y-2 rounded-sm transition-transform"
								/>
							</button>
							<button class="relative w-10"
								><img
									src="https://mc-heads.net/avatar/sunxyw"
									alt=""
									class="h-8 w-8 translate-y-2 rounded-sm transition-transform"
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
