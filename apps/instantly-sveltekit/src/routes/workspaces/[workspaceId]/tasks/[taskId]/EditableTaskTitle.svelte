<script context="module" lang="ts">
	let isEditing = writable(false);

	export function setIsEditing(value: boolean) {
		isEditing.set(value);
	}
</script>

<script lang="ts">
	import { TASK_SETTINGS } from '$src/application/constants';
	import { taskStore, updateTaskTitle } from '$src/application/stores/taskStore';
	import { updateTaskTitleFromList } from '$src/application/stores/tasksStore';
	import { writable } from 'svelte/store';
	import { onDestroy } from 'svelte';

	let newTitle = $taskStore.title;

	const handleTitleUpdate = async () => {
		// Update the individual task details
		updateTaskTitle(newTitle, false);
		// Update the task in the list
		updateTaskTitleFromList($taskStore.id, newTitle, false);
		setIsEditing(false);
	};

	onDestroy(() => {
		setIsEditing(false);
	});
</script>

{#if $isEditing}
	<!-- svelte-ignore a11y-autofocus -->
	<form on:submit|preventDefault={handleTitleUpdate} class="w-full">
		<input
			autofocus
			on:keydown={(e) => {
				console.log(e.key);
				if (e.key.toLowerCase() === 'escape') {
					newTitle = $taskStore.title;
					setIsEditing(false);
				}
			}}
			class="bg-neutral-900 rounded-lg focus:outline-primary-500 w-full p-1"
			placeholder="Task title"
			bind:value={newTitle}
		/>
	</form>
{:else}
	<button on:click={() => setIsEditing(true)}>
		{#if $taskStore.title.trim() === ''}
			<h1 class="font-semibold text-2xl text-neutral-400">
				{TASK_SETTINGS.UNNAMED_TASK_TITLE}
			</h1>
		{:else}
			<h1 class="font-semibold text-2xl">
				{$taskStore.title}
			</h1>
		{/if}
	</button>
{/if}
