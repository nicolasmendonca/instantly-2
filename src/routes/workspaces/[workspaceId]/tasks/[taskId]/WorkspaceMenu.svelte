<script lang="ts">
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

<section class="bg-slate-700 h-screen">
	<h1 class="font-extrabold text-lg p-4">Workspace 1</h1>
	<hr class="h-px bg-gray-200 border-0 dark:bg-slate-500" />
	<section class="h-full overflow-y-auto scrollbar-hide">
		<!-- In backlog -->
		<div class="top-0 py-2 sticky bg-slate-800">
			<h2
				class="border py-2 mx-2 text-slate-300 border-slate-300 rounded-lg inline-block p-2 leading-4"
			>
				In backlog: {tasks.length}
			</h2>
		</div>
		<ul class="px-2 text-sm">
			{#each tasks as task (task.id)}
				<WorkspaceMenuTaskItem {task} {workspaceId} />
			{/each}
		</ul>

		<!-- In Progress -->
		<hr class="h-px my-2 bg-gray-200 border-0 dark:bg-slate-500" />
		<div class="top-0 py-2 sticky bg-slate-800">
			<h2
				class=" py-2 mx-2 border text-slate-300 border-slate-300 rounded-lg inline-block p-2 leading-4"
			>
				In Progress: {tasks.length}
			</h2>
		</div>
		<ul class="px-2 text-sm">
			{#each tasks as task (task.id)}
				<WorkspaceMenuTaskItem {task} {workspaceId} />
			{/each}
		</ul>

		<!-- Done -->
		<hr class="h-px my-2 bg-gray-200 border-0 dark:bg-slate-500" />
		<div class="top-0 py-2 sticky bg-slate-800">
			<h2
				class="border py-2 mx-2 text-slate-300 border-slate-300 rounded-lg inline-block p-2 leading-4"
			>
				In Progress: {tasks.length}
			</h2>
		</div>
		<ul class="px-2 text-sm">
			{#each tasks as task (task.id)}
				<WorkspaceMenuTaskItem {task} {workspaceId} />
			{/each}
		</ul>
	</section>
</section>
