<script lang="ts">
	import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
	import { workspaceIdStore } from '$src/application/stores/workspaceIdStore';
	import { WORKSPACE_CONFIG } from '$src/application/DELETE_ME';
	import { goto } from '$app/navigation';
	import { paths } from '$src/routes/paths';
	import Spinner from '$src/components/Spinner.svelte';
	import { fade } from 'svelte/transition';

	let status: 'IDLE' | 'LOADING' = 'IDLE';

	const handleAddNewTask = async () => {
		status = 'LOADING';
		const { id } = await instantlyClient.createNewTask({
			statusId: WORKSPACE_CONFIG.DEFAULT_TASK_STATUS_ID,
			workspaceId: $workspaceIdStore
		});

		await goto(paths.workspaceTask($workspaceIdStore, id));
		status = 'IDLE';
	};
</script>

<button
	on:click={handleAddNewTask}
	disabled={status === 'LOADING'}
	class="mx-4 mb-2 rounded-xl border-2 border-primary-500 py-2 px-4 hover:bg-neutral-50 hover:bg-opacity-10 transition-all disabled:cursor-not-allowed"
>
	{#if status === 'LOADING'}
		<div transition:fade class="flex items-center">
			<Spinner size={4} />
			Loading
		</div>
	{:else}
		<div transition:fade class="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 mr-2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>

			Add new task
		</div>
	{/if}
</button>
