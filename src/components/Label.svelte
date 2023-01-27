<script lang="ts">
	export let label: string;
</script>

<label class="label block mb-2 text-sm font-medium text-gray-900 dark:text-white">
	{label}
	<slot />
</label>
