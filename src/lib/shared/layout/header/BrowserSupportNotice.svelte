<script lang="ts">
	import { browser } from '$app/environment';

	import HeadBanner from '$lib/shared/layout/header/HeadBanner.svelte';

	import {
		getBrowserName,
		isSupported,
		isFullSupported
	} from '$lib/shared/layout/supportedBrowsers';

	let supported = true;
	let fullSupported = true;
	let browserName = '';
	if (browser) {
		supported = isSupported(window.navigator.userAgent);
		fullSupported = isFullSupported(window.navigator.userAgent);
		browserName = getBrowserName(window.navigator.userAgent);
	}
</script>

<HeadBanner type="error" display={!supported}>
	<b class="capitalize">{browserName} is not supported.</b>
	<span class="hidden sm:inline"> We cannot guarantee a good experience. </span>
	<a class="ml-2" href="/about/faq"> Why? </a>
</HeadBanner>

<HeadBanner type="warning" display={supported && !fullSupported}>
	<b class="capitalize">{browserName} is not FULLY supported.</b>
	<span class="hidden sm:inline"> You may experience some minor issues. </span>
	<a class="ml-2" href="/about/faq"> Why? </a>
</HeadBanner>
