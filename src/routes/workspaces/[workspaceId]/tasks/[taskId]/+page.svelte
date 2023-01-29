<script lang="ts">
	import TaskWidget from './TaskWidget.svelte';
	import WorkspaceMenu from './WorkspaceMenu.svelte';
	import WorkspacesNav from './WorkspacesNav.svelte';
</script>

<svelte:head>
	<title>Setup authentication with social accounts</title>
</svelte:head>

<WorkspacesNav position="left">
	<div class="relative flex">
		<div class="fixed left-16 w-[25%] border-r border-r-neutral-800">
			<WorkspaceMenu />
		</div>
		<div class="ml-[calc(25%_+_16px)] w-full">
			<TaskWidget />
		</div>
	</div>
</WorkspacesNav>
