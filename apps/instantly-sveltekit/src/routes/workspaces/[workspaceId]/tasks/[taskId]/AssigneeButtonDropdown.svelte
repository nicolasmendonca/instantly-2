<script lang="ts">
	import Avatar from '$src/components/Avatar.svelte';

	import { Dropdown } from 'flowbite';
	import { taskStore } from '$src/application/stores/taskStore';
	import { taskAssigneeProfileStore } from '$src/application/stores/taskAssigneeProfileStore';
	import { onMount } from 'svelte';
	import AssigneeButtonDropdownList from './AssigneeButtonDropdownList.svelte';
	import Spinner from '$src/components/Spinner.svelte';

	let triggerElement: HTMLButtonElement;
	let targetElement: HTMLDivElement;
	let expanded = false;

	onMount(() => {
		taskAssigneeProfileStore.load();
	});

	$: {
		if ($taskStore) {
			new Dropdown(targetElement, triggerElement, {
				onShow: () => {
					expanded = true;
				},
				onHide: () => {
					expanded = false;
				}
			});
		}
	}
</script>

{#await taskAssigneeProfileStore.load()}
	<Spinner size={6} />
{:then}
	<button
		bind:this={triggerElement}
		type="button"
		class="pointer hover:bg-neutral-600 hover:text-white transition-all flex items-center space-x-2 border text-neutral-300 border-neutral-500 rounded-lg p-2"
	>
		{#if $taskAssigneeProfileStore}
			<div>{$taskAssigneeProfileStore.fullName}</div>
			<Avatar avatarUrl={$taskAssigneeProfileStore.avatarUrl} />
		{:else}
			<div>Unassigned</div>
		{/if}
	</button>

	<!-- Dropdown menu -->
	<div
		bind:this={targetElement}
		class="z-20 hidden bg-white rounded-lg shadow w-60 dark:bg-neutral-800 h-[26rem] overflow-y-auto"
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
		{#if expanded}
			<AssigneeButtonDropdownList />
		{/if}
	</div>
{/await}
