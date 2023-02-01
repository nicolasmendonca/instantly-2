<script lang="ts">
	import { Dropdown } from 'flowbite';
	import { workspaceMembersStore } from '$src/application/stores/workspaceMembersStore';
	import { taskStore } from '$src/application/stores/taskStore';

	let triggerElement: HTMLButtonElement;
	let targetElement: HTMLDivElement;

	$: {
		if ($taskStore) {
			new Dropdown(targetElement, triggerElement, {
				onShow: () => {
					workspaceMembersStore.load();
				}
			});
		}
	}
</script>

{#await taskStore.load() then}
	{#if $taskStore}
		<button
			bind:this={triggerElement}
			type="button"
			class="pointer hover:bg-neutral-600 hover:text-white transition-all flex items-center space-x-2 border text-neutral-300 border-neutral-500 rounded-lg p-2"
		>
			<div>{$taskStore.profiles?.full_name}</div>
			<img
				class="w-10 h-10 rounded-full"
				loading="lazy"
				src={$taskStore.profiles?.avatar_url}
				alt="Rounded avatar"
			/>
		</button>
	{/if}
{/await}

<!-- Dropdown menu -->
<div
	bind:this={targetElement}
	class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-neutral-800 h-[26rem] overflow-y-auto"
>
	<!-- <div class="p-3">
		<label for="input-group-search" class="sr-only">Search</label>
		<div class="relative">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<svg
					class="w-5 h-5 text-neutral-500 dark:text-neutral-400"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd"
					/></svg
				>
			</div>
			<input
				type="text"
				id="input-group-search"
				class="block w-full p-2 pl-10 text-sm text-neutral-900 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				placeholder="Search user"
			/>
		</div>
	</div> -->
	{#if $workspaceMembersStore}
		<ul
			class="h-full py-2 overflow-y-auto text-neutral-700 dark:text-neutral-200"
			aria-labelledby="dropdownUsersButton"
		>
			{#each $workspaceMembersStore as $workspaceMember}
				{#if $workspaceMember && $workspaceMember.profiles}
					<li>
						<button
							on:click={() => {
								taskStore.update((prevValue) => ({
									...prevValue,
									assignee_id: $workspaceMember.profiles.id,
									profiles: $workspaceMember.profiles
								}));
							}}
							class="flex items-center px-4 py-2 w-full hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
						>
							{#if $workspaceMember.profiles.id === $taskStore.assignee_id}
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
									src={$workspaceMember.profiles.avatar_url}
									alt=""
								/>
							{/if}
							{$workspaceMember.profiles.full_name}
						</button>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</div>
