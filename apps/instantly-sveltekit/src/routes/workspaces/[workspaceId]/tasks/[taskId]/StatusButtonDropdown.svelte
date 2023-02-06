<script lang="ts">
	import { page } from '$app/stores';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { Dropdown } from 'flowbite';
	import type { InstantlySupabaseClient } from 'instantly-supabase-client';
	import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';

	const queryClient = useQueryClient();

	let triggerElement: HTMLButtonElement;
	let targetElement: HTMLDivElement;

	type TaskStatus = Awaited<ReturnType<InstantlySupabaseClient['getTaskStatuses']>>;
	type Task = Awaited<ReturnType<InstantlySupabaseClient['getTask']>>;

	$: taskStatusesQuery = createQuery<TaskStatus>({
		queryKey: ['workspaces', $page.params.workspaceId, 'taskstatuses'],
		queryFn: () => instantlyClient.getTaskStatuses($page.params.workspaceId),
		initialData: $page.data.taskStatuses as TaskStatus
	});

	$: taskQuery = createQuery<Task>({
		queryKey: ['workspaces', $page.params.workspaceId, 'tasks', $page.params.taskId],
		queryFn: () => instantlyClient.getTask($page.params.taskId),
		initialData: $page.data.task as Task
	});

	$: setStatusMutation = createMutation({
		mutationFn: (statusId: string) => instantlyClient.updateTask($page.params.taskId, { statusId }),
		onMutate: async (statusId: string) => {
			await queryClient.cancelQueries([
				'workspaces',
				$page.params.workspaceId,
				'tasks',
				$page.params.taskId
			]);
			await queryClient.cancelQueries(['workspaces', $page.params.workspaceId, 'tasks']);
			queryClient.setQueryData<Task>(
				['workspaces', $page.params.workspaceId, 'tasks', $page.params.taskId],
				(prevValue) => <Task>{ ...prevValue, statusId }
			);
			queryClient.setQueryData<Task[]>(
				['workspaces', $page.params.workspaceId, 'tasks'],
				(prevValue) => {
					if (!prevValue) return prevValue;
					return prevValue.map((task) => {
						if (task.id === $page.params.taskId) {
							return {
								...task,
								statusId
							};
						}
						return task;
					});
				}
			);
		}
	});

	$: currentTaskStatus = $taskStatusesQuery.data.find(
		(status) => status.id === $taskQuery.data.statusId
	);

	$: if ($taskStatusesQuery.isSuccess) new Dropdown(targetElement, triggerElement);
</script>

<button
	bind:this={triggerElement}
	class="pointer hover:bg-neutral-600 hover:text-white transition-all border py-2 text-neutral-300 border-neutral-500 rounded-lg inline-block p-2 leading-loose"
>
	{currentTaskStatus?.label}
</button>

<!-- Dropdown menu -->
<div
	bind:this={targetElement}
	class="z-20 hidden w-48 bg-white divide-y divide-neutral-100 rounded-lg shadow dark:bg-neutral-800 dark:divide-neutral-600"
>
	<ul
		class="p-3 text-md text-neutral-700 dark:text-neutral-200"
		aria-labelledby="dropdownRadioBgHoverButton"
	>
		{#each $taskStatusesQuery.data as taskStatus (taskStatus.id)}
			<li>
				<div class="rounded hover:bg-neutral-100 dark:hover:bg-neutral-600">
					<label
						class="flex items-center cursor-pointer w-full text-md rounded text-neutral-700 dark:text-neutral-200 select-none"
					>
						<input
							type="radio"
							value={taskStatus.id}
							checked={taskStatus.id === currentTaskStatus?.id}
							on:change={() => $setStatusMutation.mutate(taskStatus.id)}
							name="default-radio"
							class="w-4 h-4 m-2 text-primary-600 bg-neutral-100 border-neutral-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-neutral-700 dark:focus:ring-offset-neutral-700 focus:ring-2 dark:bg-neutral-600 dark:border-neutral-500"
						/>
						<div class="pl-2 p-2">
							{taskStatus.label}
						</div>
					</label>
				</div>
			</li>
		{/each}
	</ul>
</div>
