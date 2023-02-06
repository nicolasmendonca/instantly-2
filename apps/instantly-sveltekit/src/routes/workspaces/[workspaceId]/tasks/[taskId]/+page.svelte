<script lang="ts">
	import { fade } from 'svelte/transition';
	import { tasksGroupedByStatusStore } from '$src/application/stores/tasksGroupedByStatusStore';
	import { taskStatusesStore } from '$src/application/stores/taskStatusesStore';
	import { taskStore } from '$src/application/stores/taskStore';
	import { workspacesStore } from '$src/application/stores/workspacesStore';
	import { authUserProfileStore } from '$src/application/stores/authUserProfileStore';
	import { tasksStore } from '$src/application/stores/tasksStore';
	import Spinner from '$src/components/Spinner.svelte';
	import LoadedTaskPage from './LoadedTaskPage.svelte';

	const pageDependencies = [
		tasksGroupedByStatusStore,
		taskStore,
		tasksStore,
		workspacesStore,
		taskStatusesStore,
		authUserProfileStore
	] as const;

	$: pagePromise = pageDependencies.map((store) => store.load());
</script>

{#await Promise.all(pagePromise)}
	<div class="flex h-screen w-screen items-center justify-center overflow-x-hidden" transition:fade>
		<Spinner />
	</div>
{:then}
	<div transition:fade class="overflow-x-hidden">
		<LoadedTaskPage />
	</div>
{/await}
