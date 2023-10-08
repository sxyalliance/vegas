<script>
	import { fade } from 'svelte/transition';
</script>

<section
	in:fade={{ duration: 400 }}
	out:fade={{ duration: 300 }}
	class="fixed bottom-0 left-0 right-0 top-0 z-50 h-screen overflow-hidden bg-hue2"
>
	<div class="h-full w-full flex items-center justify-center">
		<div class="flex items-center justify-center">
			<div class="loader-wrapper" style="">
				<div class="spinner-inner">
					<div id="top" class="mask">
						<div class="plane" />
					</div>
					<div id="middle" class="mask">
						<div class="plane" />
					</div>
					<div id="bottom" class="mask">
						<div class="plane" />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.loader-wrapper {
		--size: 70px;
		--color: var(--vg-rainbow-1);
		--rgba: var(--vg-rainbow-a);
		--duration: 1.3s;

		animation: rainbow 20s linear infinite;

		height: var(--size);
		width: var(--size);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loader-wrapper * {
		line-height: 0;
		box-sizing: border-box;
	}

	.spinner-inner {
		height: var(--size);
		width: var(--size);
		transform: scale(calc(var(--size) / 70));
	}

	.mask {
		position: absolute;
		border-radius: 2px;
		overflow: hidden;
		perspective: 1000;
		backface-visibility: hidden;
	}

	.plane {
		background: var(--color);
		width: 400%;
		height: 100%;
		position: absolute;
		z-index: 100;
		perspective: 1000;
		backface-visibility: hidden;
	}

	#top .plane {
		z-index: 2000;
		animation: trans1 var(--duration) ease-in infinite 0s backwards;
	}

	#middle .plane {
		transform: translate3d(0px, 0, 0);
		background: var(--rgba);
		animation: trans2 var(--duration) linear infinite calc(var(--duration) / 4) backwards;
	}

	#bottom .plane {
		z-index: 2000;
		animation: trans3 var(--duration) ease-out infinite calc(var(--duration) / 2) backwards;
	}

	#top {
		width: 53px;
		height: 20px;
		left: 20px;
		top: 5px;
		transform: skew(-15deg, 0);
		z-index: 100;
	}

	#middle {
		width: 33px;
		height: 20px;
		left: 20px;
		top: 21px;
		transform: skew(-15deg, 40deg);
	}

	#bottom {
		width: 53px;
		height: 20px;
		top: 35px;
		transform: skew(-15deg, 0);
	}

	.pause-animation .plane {
		animation-play-state: paused;
	}

	@keyframes trans1 {
		from {
			transform: translate3d(53px, 0, 0);
		}
		to {
			transform: translate3d(-250px, 0, 0);
		}
	}

	@keyframes trans2 {
		from {
			transform: translate3d(-160px, 0, 0);
		}
		to {
			transform: translate3d(53px, 0, 0);
		}
	}

	@keyframes trans3 {
		from {
			transform: translate3d(53px, 0, 0);
		}
		to {
			transform: translate3d(-220px, 0, 0);
		}
	}
</style>
