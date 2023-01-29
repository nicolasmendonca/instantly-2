<script lang="ts">
	import Split from 'split.js';
	import { onMount } from 'svelte';

	import ChatWidget from './ChatWidget.svelte';
	import TaskWidget from './TaskWidget.svelte';
	import WorkspaceMenu from './WorkspaceMenu.svelte';
	import WorkspacesNav from './WorkspacesNav.svelte';

	let workspacePane: HTMLDivElement;
	let taskPane: HTMLDivElement;

	onMount(() => {
		Split([workspacePane, taskPane], {
			sizes: [25, 75],
			minSize: [300, 400],
			cursor: 'col-resize'
		});
	});
</script>

<svelte:head>
	<title>Setup authentication with social accounts</title>
</svelte:head>

<WorkspacesNav position="left">
	<div class="relative flex">
		<div
			bind:this={workspacePane}
			class="h-screen overflow-y-auto w-[25%] border-r border-r-neutral-800"
		>
			<WorkspaceMenu />
		</div>
		<div bind:this={taskPane} class="h-screen overflow-y-auto relative min-h-screen">
			<TaskWidget />
			<ChatWidget />
		</div>
	</div>
</WorkspacesNav>

<style lang="postcss">
	:global(.gutter) {
		/* background-color: #eee; */
		background-repeat: no-repeat;
		background-position: 50%;

		@apply bg-slate-800;
	}
	:global(.gutter.gutter-horizontal) {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
		cursor: col-resize;
	}
</style>
