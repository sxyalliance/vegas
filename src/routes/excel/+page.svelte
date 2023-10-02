<script lang="ts">
	import type { PageData } from './$types';
	import { parseIt } from '$lib/google/sheet';

	export let data: PageData;

	$: console.log(parseIt(data.unparsed));
</script>
