<script lang="ts">
	import { page } from '$app/stores';
	import Hashtag from '$components/svg/Hashtag.svelte';

	export let workspaceId: string;
	export let task: {
		id: string;
		title: string;
	};

	$: isActiveTask = $page.params.taskId === task.id;
</script>

<li class="">
	<a
		href={`/workspaces/${workspaceId}/tasks/${task.id}`}
		class="flex space-x-2 items-center rounded-lg px-2 py-3"
		class:hover:bg-neutral-600={!isActiveTask}
		class:bg-neutral-50={isActiveTask}
		class:text-neutral-900={isActiveTask}
		><Hashtag />
		<div class="text-ellipsis whitespace-nowrap overflow-hidden">
			{task.title}
		</div>
	</a>
</li>
