<script lang="ts">
	import Hashtag from '$components/svg/Hashtag.svelte';

	export let workspaceId: number;
	export let task: {
		id: number;
		name: string;
	};
</script>

<li class="">
	<a
		href={`/workspaces/${workspaceId}/tasks/${task.id}`}
		class="flex space-x-2 items-center rounded-lg hover:bg-neutral-600 px-2 py-3"
		><Hashtag />
		<div class="text-ellipsis whitespace-nowrap overflow-hidden">
			{task.name}
		</div>
	</a>
</li>
