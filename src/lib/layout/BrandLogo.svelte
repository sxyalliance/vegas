<script>
	import Img from '@zerodevx/svelte-img';
	import { _ } from 'svelte-i18n';
	import { store } from '$lib/theme/store.js';

	import logoLight from '$lib/assets/logo-light.png?w=128&as=run:0';
	import logoDark from '$lib/assets/logo-dark.png?w=128&as=run:0';

	$: logo = $store === 'dark' ? logoDark : logoLight;

	let clazz = '';
	export { clazz as class };
</script>

<Img src={logo} class={clazz} alt={$_('brand.sr_logo')} />
