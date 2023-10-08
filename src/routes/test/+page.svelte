<script lang="ts">
	import type { PageData } from './$types';
	import { Event } from '$lib/entities/event';

	export let data: PageData;

	const events: Event[] = data.events.map((event: string) => Event.deserialize(event));
</script>
