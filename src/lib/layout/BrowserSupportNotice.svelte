<script lang="ts">
	import HeadBanner from '$lib/layout/HeadBanner.svelte';
	import { browser } from '$app/environment';
	import {
		getBrowserFamily,
		getBrowserName,
		isSupported,
		isFullSupported,
		supportedBrowsers
	} from '$lib/shared/supportedBrowsers';

	let supported = true;
	let fullSupported = true;
	let browserName = '';
	if (browser) {
		supported = isSupported(window.navigator.userAgent);
		fullSupported = isFullSupported(window.navigator.userAgent);
		browserName = getBrowserName(window.navigator.userAgent);
		console.log(supportedBrowsers);
		console.log(getBrowserFamily(window.navigator.userAgent));
		console.log(getBrowserName(window.navigator.userAgent));
	}
</script>

<HeadBanner type="error" display={!supported}>
	<b class="capitalize">{browserName} is not supported.</b>
	<span class="hidden sm:inline"> We cannot guarantee a good experience. </span>
	<a class="ml-2" href="#"> Why? </a>
</HeadBanner>

<HeadBanner type="warning" display={supported && fullSupported}>
	<b class="capitalize">{browserName} is not fully supported.</b>
	<span class="hidden sm:inline"> You may experience some issues. </span>
	<a class="ml-2" href="#"> Why? </a>
</HeadBanner>
