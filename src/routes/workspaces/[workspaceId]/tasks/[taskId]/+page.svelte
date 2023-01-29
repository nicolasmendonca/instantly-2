<script lang="ts">
	import TaskWidget from './TaskWidget.svelte';
	import WorkspaceMenu from './WorkspaceMenu.svelte';
	import WorkspacesNav from './WorkspacesNav.svelte';
	import type { PageData } from './$types';
</script>

<WorkspacesNav position="left">
	<div class="relative flex">
		<div class="fixed left-16 w-[18rem]">
			<WorkspaceMenu />
		</div>
		<div class="ml-[18rem] w-full">
			<TaskWidget />
		</div>
	</div>
</WorkspacesNav>
