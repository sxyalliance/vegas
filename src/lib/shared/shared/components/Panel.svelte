<script lang="ts">
	let clazz: string;
	export { clazz as class };
</script>

<div class="rounded-lg bg-neutral-1 {clazz}">
	<slot />
</div>
