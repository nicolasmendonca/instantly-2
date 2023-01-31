<script lang="ts">
	import Split from 'split.js';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	import ChatWidget from './ChatWidget.svelte';
	import TaskWidget from './TaskWidget.svelte';
	import WorkspaceMenu from './WorkspaceMenu.svelte';
	import WorkspacesNav from './WorkspacesNav.svelte';

	let workspacePane: HTMLDivElement;
	let taskPane: HTMLDivElement;
	let chatPane: HTMLDivElement;

	export let data: PageData;

	$: workspacesLinks = data.workspaces.map((workspace) => {
		return {
			id: workspace.id,
			href: `/workspaces/${workspace.id}`,
			label: workspace.name!
		};
	});

	onMount(() => {
		Split([workspacePane, chatPane, taskPane], {
			sizes: [20, 50, 30],
			minSize: [300, 400, 200],
			cursor: 'col-resize'
		});
	});
</script>

<svelte:head>
	<title>Setup authentication with social accounts</title>
</svelte:head>

<div class="flex">
	<div class="w-16">
		<WorkspacesNav {workspacesLinks} />
	</div>
	<div class="flex w-screen h-screen overflow-x-hidden">
		<div class="w-[20%]" bind:this={workspacePane}>
			<WorkspaceMenu />
		</div>
		<div class="w-[50%]" bind:this={chatPane}>
			<ChatWidget />
		</div>
		<div class="w-[30%]" bind:this={taskPane}>
			<TaskWidget />
		</div>
	</div>
</div>

<style lang="postcss">
	:global(.gutter) {
		/* background-color: #eee; */
		background-repeat: no-repeat;
		background-position: 50%;
		width: 6px !important;

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
