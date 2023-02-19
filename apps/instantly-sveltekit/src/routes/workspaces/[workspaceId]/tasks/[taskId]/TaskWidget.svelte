<script lang="ts">
	import EditableTaskTitle from './EditableTaskTitle.svelte';

	import { taskStore } from '$src/application/stores/taskStore';
	import Spinner from '$src/components/Spinner.svelte';
	import AssigneeButtonDropdown from './AssigneeButtonDropdown.svelte';
	import StatusButtonDropdown from './StatusButtonDropdown.svelte';
	import TaskDescription from './TaskDescription.svelte';
</script>

<div class="bg-neutral-700 h-screen max-h-screen overflow-y-auto">
	{#await taskStore.load()}
		<div class="w-full h-screen flex items-center justify-center">
			<Spinner />
		</div>
	{:then}
		{#if $taskStore}
			<header>
				<div class="px-4 lg:mx-auto py-4 flex items-center justify-between">
					<EditableTaskTitle />
				</div>
				<hr class="h-px bg-gray-500 border-0 dark:bg-neutral-500" />
			</header>
			<div class="pt-6 pb-10 px-4">
				<section class="mx-4 lg:mx-auto text-left flex flex-col space-y-4 justify-between">
					<div class="flex items-center space-x-4 self-start md:self-baseline">
						<div class="font-bold text-lg">Status:</div>
						<StatusButtonDropdown />
					</div>
					<div class="flex items-center space-x-4 self-start md:self-baseline">
						<div class="font-bold text-lg">Assignee:</div>
						<AssigneeButtonDropdown />
					</div>
				</section>

				<div class="my-6" />

				<section class="mx-4 lg:mx-auto">
					<h2 class="font-bold text-lg mb-2">Description:</h2>
					<TaskDescription />
				</section>
			</div>
		{/if}
	{/await}
</div>
