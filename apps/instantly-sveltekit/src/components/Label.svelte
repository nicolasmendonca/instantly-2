<script lang="ts">
	export let label: string;
	export let isRequired = false;
</script>

<label class="label block mb-2 text-sm font-medium text-gray-900 dark:text-white">
	{label}
	{#if isRequired}
		<span class="font-bold text-danger-500">*</span>
	{/if}
	<slot />
</label>
