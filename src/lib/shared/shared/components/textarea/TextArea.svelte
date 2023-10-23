<script lang="ts">
	let clazz: string | false | null = null;
	export { clazz as class };

	export let value: string;

	export let placeholder: string = '';

	export let name: string;
</script>

<textarea
	rows="4"
	{name}
	bind:value
	{placeholder}
	{...$$restProps}
	class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 {clazz}"
/>
