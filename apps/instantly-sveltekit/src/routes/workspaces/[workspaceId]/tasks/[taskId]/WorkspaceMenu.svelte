<script lang="ts">
	import AddNewTaskButton from './AddNewTaskButton.svelte';

	import WorkspaceMenuSectionDivider from './WorkspaceMenuSectionDivider.svelte';
	import WorkspaceMenuTaskStatusHeading from './WorkspaceMenuTaskStatusHeading.svelte';
	import WorkspaceMenuTaskItem from './WorkspaceMenuTaskItem.svelte';

	import { workspaceStore } from '$src/application/stores/workspaceStore';
	import { tasksGroupedByStatusStore } from '$src/application/stores/tasksGroupedByStatusStore';
	import { slide } from 'svelte/transition';
</script>

{#await workspaceStore.load() then}
	{#if $workspaceStore}
		<section class="bg-neutral-700">
			<h1 class="font-extrabold text-lg p-4">{$workspaceStore.name}</h1>
			<AddNewTaskButton />
			<section class="h-[calc(100vh_-_4rem)] overflow-y-auto">
				{#await tasksGroupedByStatusStore.load() then}
					{#if $tasksGroupedByStatusStore}
						{#each $tasksGroupedByStatusStore as $statusWithTasks ($statusWithTasks.status.id)}
							<WorkspaceMenuSectionDivider>
								<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />
								<WorkspaceMenuTaskStatusHeading>
									<div class="flex items-center justify-between">
										<div>{$statusWithTasks.status.label}</div>
										<div class="rounded-lg border border-neutral-600 font-light">
											{$statusWithTasks.tasks.length} tasks
										</div>
									</div>
								</WorkspaceMenuTaskStatusHeading>
								<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />
							</WorkspaceMenuSectionDivider>
							<ul class="mx-2 my-4 text-sm">
								{#each $statusWithTasks.tasks as $task ($task.id)}
									<div transition:slide>
										<WorkspaceMenuTaskItem task={$task} workspaceId={$workspaceStore.id} />
									</div>
								{/each}
							</ul>
						{/each}
					{/if}
				{/await}
			</section>
		</section>
	{/if}
{/await}
