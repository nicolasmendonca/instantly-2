<script lang="ts">
	import RichTextEditor from '$src/components/RichTextEditor.svelte';
	import { taskStore } from '$src/application/stores/taskStore';
</script>

{#await taskStore.load() then}
	<RichTextEditor
		initialValue={$taskStore.description ?? ''}
		updateValue={(html) => {
			return taskStore.update((value) => {
				if (!value) return value;
				return {
					...value,
					description: html
				};
			});
		}}
	/>
{/await}
