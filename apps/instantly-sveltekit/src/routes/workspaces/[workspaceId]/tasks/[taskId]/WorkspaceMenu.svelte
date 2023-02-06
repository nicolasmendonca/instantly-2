<script lang="ts">
	import WorkspaceMenuSectionDivider from './WorkspaceMenuSectionDivider.svelte';
	import WorkspaceMenuTaskStatusHeading from './WorkspaceMenuTaskStatusHeading.svelte';
	import WorkspaceMenuTaskItem from './WorkspaceMenuTaskItem.svelte';
	import { createQuery } from '@tanstack/svelte-query';

	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
	import type { InstantlySupabaseClient } from 'instantly-supabase-client';

	type Workspaces = Awaited<ReturnType<InstantlySupabaseClient['getWorkspaces']>>;
	type Tasks = Awaited<ReturnType<InstantlySupabaseClient['getTasks']>>;
	type TasksStatuses = Awaited<ReturnType<InstantlySupabaseClient['getTaskStatuses']>>;

	$: workspacesQuery = createQuery<Workspaces>({
		queryKey: ['workspaces'],
		queryFn: () => instantlyClient.getWorkspaces(),
		initialData: ($page.data.workspaces ?? []) as Workspaces
	});

	$: tasksQuery = createQuery<Tasks>({
		queryKey: ['workspaces', $page.params.workspaceId, 'tasks'],
		queryFn: () => instantlyClient.getTasks($page.params.workspaceId),
		initialData: ($page.data.tasks ?? []) as Tasks
	});

	$: taskStatuses = createQuery<TasksStatuses>({
		queryKey: ['workspaces', $page.params.workspaceId, 'taskstatuses'],
		queryFn: () => instantlyClient.getTaskStatuses($page.params.workspaceId),
		initialData: ($page.data.taskStatuses ?? []) as TasksStatuses
	});

	$: activeWorkspace = $workspacesQuery.data?.find(
		(workspace) => workspace.id === $page.params.workspaceId
	);

	$: tasksGroupedByStatus = $taskStatuses.data.map((status) => {
		return {
			status,
			tasks: $tasksQuery.data.filter((task) => task.statusId === status.id)
		};
	});
</script>

{#if $workspacesQuery.isSuccess && activeWorkspace}
	<section class="bg-neutral-700">
		<h1 class="font-extrabold text-lg p-4">{activeWorkspace.name}</h1>
		<section class="h-[calc(100vh_-_4rem)] overflow-y-auto">
			{#each tasksGroupedByStatus as $statusWithTasks ($statusWithTasks.status.id)}
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
							<WorkspaceMenuTaskItem task={$task} workspaceId={activeWorkspace.id} />
						</div>
					{/each}
				</ul>
			{/each}
		</section>
	</section>
{/if}
