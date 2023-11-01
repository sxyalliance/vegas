<script>
	import Img from '@zerodevx/svelte-img';

	import logoDark from '$lib/assets/logo-dark.png?w=128&as=run:0';
	import logoLight from '$lib/assets/logo-light.png?w=128&as=run:0';
	import { _ } from '$lib/shared/i18n';
	import { theme } from '$lib/shared/theme/store';

	$: logo = $theme === 'dark' ? logoDark : logoLight;

	let clazz = '';
	export { clazz as class };
</script>

<Img src={logo} class={clazz} alt={_('common_brand_name')} loading="eager" />
