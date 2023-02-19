<script lang="ts">
	import { page } from '$app/stores';
	import Hashtag from '$components/svg/Hashtag.svelte';
	import { TASK_SETTINGS } from '$src/application/constants';

	export let workspaceId: string;
	export let task: {
		id: string;
		title: string;
	};

	$: isActiveTask = $page.params.taskId === task.id;
	$: isUnnamedTask = task.title.trim() === '';
</script>

<li class="">
	<a
		href={`/workspaces/${workspaceId}/tasks/${task.id}`}
		class="flex space-x-2 items-center rounded-lg px-2 py-3"
		class:text-neutral-400={!isActiveTask && isUnnamedTask}
		class:hover:bg-neutral-600={!isActiveTask}
		class:bg-neutral-50={isActiveTask}
		class:text-neutral-900={isActiveTask}
		><Hashtag />
		{#if isUnnamedTask}
			<div class="text-ellipsis whitespace-nowrap overflow-hidden">
				{TASK_SETTINGS.UNNAMED_TASK_TITLE}
			</div>
		{:else}
			<div class="text-ellipsis whitespace-nowrap overflow-hidden">
				{task.title}
			</div>
		{/if}
	</a>
</li>
