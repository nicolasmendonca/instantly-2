<script lang="ts">
	import { page } from '$app/stores';
	import Spinner from '$src/components/Spinner.svelte';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import type { InstantlySupabaseClient } from 'instantly-supabase-client';
	import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';

	const queryClient = useQueryClient();
	type Task = Awaited<ReturnType<InstantlySupabaseClient['getTask']>>;
	type Profile = Awaited<ReturnType<InstantlySupabaseClient['getProfile']>>;

	$: taskQuery = createQuery<Task>({
		queryKey: ['workspaces', $page.params.workspaceId, 'tasks', $page.params.taskId],
		queryFn: () => instantlyClient.getTask($page.params.taskId),
		initialData: $page.data.task as Task
	});

	$: assigneeProfileQuery = createQuery<null | Profile>({
		queryKey: ['workspaces', $page.params.workspaceId, 'tasks', $taskQuery.data?.id, 'assignee'],
		queryFn: () =>
			$taskQuery.data?.assigneeId ? instantlyClient.getProfile($taskQuery.data.assigneeId) : null
	});

	$: workspaceProfilesQuery = createQuery<Profile[]>({
		queryKey: ['workspaces', $page.params.workspaceId, 'members'],
		queryFn: () => instantlyClient.getWorkspaceProfiles($page.params.workspaceId)
	});

	$: setAssigneeMutation = createMutation({
		mutationFn: (assigneeId: string | null) =>
			instantlyClient.updateTask($page.params.taskId, { assigneeId }),
		onMutate: async (assigneeId: string | null) => {
			await queryClient.cancelQueries([
				'workspaces',
				$page.params.workspaceId,
				'tasks',
				$page.params.taskId
			]);
			await queryClient.cancelQueries([
				'workspaces',
				$page.params.workspaceId,
				'tasks',
				$taskQuery.data?.id,
				'assignee'
			]);
			queryClient.setQueryData<Task>(
				['tasks', $page.params.taskId],
				(prevValue) => <Task>{ ...prevValue, assigneeId }
			);
			queryClient.setQueryData<Profile | null>(
				['workspaces', $page.params.workspaceId, 'tasks', $taskQuery.data?.id, 'assignee'],
				assigneeId ? $workspaceProfilesQuery.data?.find((p) => p.id === assigneeId) : null
			);
		}
	});
</script>

<button
	class="text-primary-500 w-full p-2 text-right px-2 underline"
	on:click={() => $setAssigneeMutation.mutate(null)}
>
	Unassign
</button>
<ul
	class="h-full py-2 overflow-y-auto text-neutral-700 dark:text-neutral-200 border-t border-t-neutral-400"
	aria-labelledby="dropdownUsersButton"
>
	{#if $workspaceProfilesQuery.isSuccess}
		{#each $workspaceProfilesQuery.data as workspaceMember}
			{#if workspaceMember && workspaceMember}
				<li>
					<button
						on:click={() => {
							$setAssigneeMutation.mutate(workspaceMember.id);
						}}
						class="flex items-center px-4 py-2 w-full hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
					>
						{#if workspaceMember.id === $assigneeProfileQuery.data?.id}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-6 h-6 mr-2 rounded-full text-primary-500"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else}
							<img
								class="w-6 h-6 mr-2 rounded-full object-cover"
								loading="lazy"
								src={workspaceMember.avatarUrl}
								alt=""
							/>
						{/if}
						{workspaceMember.fullName}
					</button>
				</li>
			{/if}
		{/each}
	{:else}
		<div class="flex items-center justify-center w-full h-full">
			<Spinner />
		</div>
	{/if}
</ul>
