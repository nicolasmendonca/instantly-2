<script lang="ts">
	import TaskWidget from './TaskWidget.svelte';
	import WorkspaceMenu from './WorkspaceMenu.svelte';
	import WorkspacesNav from './WorkspacesNav.svelte';
</script>

<WorkspacesNav position="left">
	<div class="relative flex">
		<div class="fixed left-16 w-[25%]">
			<WorkspaceMenu />
		</div>
		<div class="ml-[25%] w-full">
			<TaskWidget />
		</div>
	</div>
</WorkspacesNav>
