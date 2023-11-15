<script>
	import Img from '@zerodevx/svelte-img';

	import logoDark from '$lib/assets/logo-dark.png?w=128&as=run:0';
	import logoLight from '$lib/assets/logo-light.png?w=128&as=run:0';
	import * as m from '$lib/shared/i18n/compiled/messages';
	import { currentTheme } from '$lib/shared/theme';

	$: logo = $currentTheme === 'dark' ? logoDark : logoLight;

	let clazz = '';
	export { clazz as class };
</script>

<Img src={logo} class={clazz} alt={m.common_brand_name()} loading="eager" />
