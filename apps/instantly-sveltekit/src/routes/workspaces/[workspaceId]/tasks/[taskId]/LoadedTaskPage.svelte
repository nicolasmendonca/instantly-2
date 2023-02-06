<script lang="ts">
	import Split from 'split.js';
	import { onMount } from 'svelte';

	import ChatWidget from './ChatWidget.svelte';
	import TaskWidget from './TaskWidget.svelte';
	import WorkspaceMenu from './WorkspaceMenu.svelte';
	import WorkspacesNav from './WorkspacesNav.svelte';

	let workspacePane: HTMLDivElement;
	let taskPane: HTMLDivElement;
	let chatPane: HTMLDivElement;

	onMount(() => {
		Split([workspacePane, chatPane, taskPane], {
			sizes: [20, 50, 30],
			minSize: [200, 400, 300],
			cursor: 'col-resize',
			gutterSize: 4
		});
	});
</script>

<div class="flex">
	<div class="w-16">
		<WorkspacesNav />
	</div>
	<div class="flex w-screen h-screen overflow-x-hidden">
		<div class="w-[20%] overflow-y-hidden" bind:this={workspacePane}>
			<WorkspaceMenu />
		</div>
		<div class="w-[50%] overflow-y-hidden" bind:this={chatPane}>
			<!-- <ChatWidget /> -->
		</div>
		<div class="w-[30%] overflow-y-hidden" bind:this={taskPane}>
			<TaskWidget />
		</div>
	</div>
</div>

<style lang="postcss">
	:global(.gutter) {
		/* background-color: #eee; */
		background-repeat: no-repeat;
		background-position: 50%;

		@apply bg-neutral-900;
	}

	:global(.gutter:hover) {
		@apply bg-neutral-600;
	}

	:global(.gutter.gutter-horizontal) {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
		cursor: col-resize;
	}
</style>
