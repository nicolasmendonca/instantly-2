<script lang="ts">
	import RichTextEditor from '$src/components/RichTextEditor.svelte';
	import { taskStore, updateTaskDescription } from '$src/application/stores/taskStore';
</script>

{#await taskStore.load() then}
	<RichTextEditor
		initialValue={$taskStore.description ?? ''}
		updateValue={(html) => updateTaskDescription(html, false)}
	/>
{/await}
