<script lang="ts">
	import WorkspaceMenuSectionDivider from './WorkspaceMenuSectionDivider.svelte';
	import WorkspaceMenuTaskStatusHeading from './WorkspaceMenuTaskStatusHeading.svelte';
	import WorkspaceMenuTaskItem from './WorkspaceMenuTaskItem.svelte';
	import type { PageData } from '../$types';

	import { page } from '$app/stores';

	$: pageData = $page.data as PageData;
	$: tasks = pageData.tasks;
	$: taskStatus = pageData.taskStatus;
	$: workspace = pageData.workspace;
</script>

<section class="bg-neutral-700">
	<h1 class="font-extrabold text-lg p-4 h-16">{workspace?.name}</h1>
	<section class="h-[calc(100vh_-_4rem)] overflow-y-auto">
		{#each taskStatus as taskStatusItem (taskStatusItem.id)}
			{@const filteredTasks = tasks.filter((task) => task.status === taskStatusItem.id)}
			<!-- In backlog -->
			<WorkspaceMenuSectionDivider>
				<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />
				<WorkspaceMenuTaskStatusHeading>
					<div class="flex items-center justify-between">
						<div>{taskStatusItem.label}</div>
						<div class="rounded-lg border border-neutral-600 font-light">
							{filteredTasks.length} tasks
						</div>
					</div>
				</WorkspaceMenuTaskStatusHeading>
				<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />
			</WorkspaceMenuSectionDivider>
			<ul class="mx-2 my-4 text-sm">
				{#each filteredTasks as task (task.id)}
					<WorkspaceMenuTaskItem {task} workspaceId={workspace.id} />
				{/each}
			</ul>
		{/each}
	</section>
</section>
