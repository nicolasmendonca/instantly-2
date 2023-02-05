<script lang="ts">
	import { taskAssigneeProfileStore } from '$src/application/stores/taskAssigneeProfileStore';
	import { taskStore } from '$src/application/stores/taskStore';
	import { workspaceMembersStore } from '$src/application/stores/workspaceMembersStore';
</script>

<ul
	class="h-full py-2 overflow-y-auto text-neutral-700 dark:text-neutral-200"
	aria-labelledby="dropdownUsersButton"
>
	{#if $workspaceMembersStore}
		{#each $workspaceMembersStore as $workspaceMember}
			{#if $workspaceMember && $workspaceMember}
				<li>
					<button
						on:click={() => {
							taskStore.update((prevValue) => ({
								...prevValue,
								assigneeId: $workspaceMember.id
							}));
						}}
						class="flex items-center px-4 py-2 w-full hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
					>
						{#if $workspaceMember.id === $taskAssigneeProfileStore?.id}
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
								class="w-6 h-6 mr-2 rounded-full"
								loading="lazy"
								src={$workspaceMember.avatarUrl}
								alt=""
							/>
						{/if}
						{$workspaceMember.fullName}
					</button>
				</li>
			{/if}
		{/each}
	{/if}
</ul>
