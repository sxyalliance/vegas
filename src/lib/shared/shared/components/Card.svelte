<script lang="ts">
	let clazz: string;
	export { clazz as class };
</script>

<div class="rounded-lg border border-neutralA-6 bg-neutralA-1 p-6 shadow-sm {clazz}">
	<slot />
</div>
