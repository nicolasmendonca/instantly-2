<script lang="ts">
	import WorkspaceMenuSectionDivider from './WorkspaceMenuSectionDivider.svelte';
	import WorkspaceMenuTaskStatusHeading from './WorkspaceMenuTaskStatusHeading.svelte';
	import WorkspaceMenuTaskItem from './WorkspaceMenuTaskItem.svelte';

	import { page } from '$app/stores';

	let tasks = Array.from({ length: 20 }, (_, i) => {
		const id = i + 1;
		return {
			id,
			name: ` ${id} lorem ipsum dolor sit amet consectetur adipisicing elit. Ab numquam ea doloremque eum quaerat omnis obcaecati ducimus, rem, quis, officiis cupiditate dolore repellendus amet minima illo! Possimus sunt veritatis ad`
		};
	});
	$: workspaceId = Number($page.params.workspaceId);
</script>

<section class="bg-neutral-700 h-screen">
	<h1 class="font-extrabold text-lg p-4 h-16">Workspace 1</h1>
	<section class="h-full overflow-y-auto scrollbar-hide">
		<!-- In backlog -->
		<WorkspaceMenuSectionDivider>
			<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />
			<WorkspaceMenuTaskStatusHeading>
				<div class="flex items-center justify-between">
					<div>In Backlog</div>
					<div class="rounded-lg border border-neutral-600 font-light">
						{tasks.length} tasks
					</div>
				</div>
			</WorkspaceMenuTaskStatusHeading>
			<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />
		</WorkspaceMenuSectionDivider>
		<ul class="mx-2 my-4 text-sm">
			{#each tasks as task (task.id)}
				<WorkspaceMenuTaskItem {task} {workspaceId} />
			{/each}
		</ul>

		<!-- In Progress -->
		<WorkspaceMenuSectionDivider>
			<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />
			<WorkspaceMenuTaskStatusHeading>
				<div class="flex items-center justify-between">
					<div>In Progress</div>
					<div class="rounded-lg border border-neutral-600 font-light">
						{tasks.length} tasks
					</div>
				</div>
			</WorkspaceMenuTaskStatusHeading>
			<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />
		</WorkspaceMenuSectionDivider>
		<ul class="mx-2 my-4 text-sm">
			{#each tasks as task (task.id)}
				<WorkspaceMenuTaskItem {task} {workspaceId} />
			{/each}
		</ul>

		<!-- Done -->
		<WorkspaceMenuSectionDivider>
			<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />
			<WorkspaceMenuTaskStatusHeading>
				<div class="flex items-center justify-between">
					<div>Done</div>
					<div class="rounded-lg border border-neutral-600 font-light">
						{tasks.length} tasks
					</div>
				</div>
			</WorkspaceMenuTaskStatusHeading>
			<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />
		</WorkspaceMenuSectionDivider>
		<ul class="mx-2 my-4 text-sm">
			{#each tasks as task (task.id)}
				<WorkspaceMenuTaskItem {task} {workspaceId} />
			{/each}
		</ul>
	</section>
</section>
