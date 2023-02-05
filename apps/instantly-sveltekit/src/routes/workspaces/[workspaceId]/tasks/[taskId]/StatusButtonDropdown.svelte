<script lang="ts">
	import { Dropdown } from 'flowbite';
	import { taskStatusesStore } from '$src/application/stores/taskStatusesStore';
	import { taskStore } from '$src/application/stores/taskStore';
	import { currentTaskStatusStore } from '$src/application/stores/currentTaskStatusStore';
	import { tasksStore } from '$src/application/stores/tasksStore';

	let triggerElement: HTMLButtonElement;
	let targetElement: HTMLDivElement;

	$: if ($taskStatusesStore) new Dropdown(targetElement, triggerElement);
</script>

{#await currentTaskStatusStore.load() then}
	{#if $currentTaskStatusStore}
		<button
			bind:this={triggerElement}
			class="pointer hover:bg-neutral-600 hover:text-white transition-all border py-2 text-neutral-300 border-neutral-500 rounded-lg inline-block p-2 leading-loose"
		>
			{$currentTaskStatusStore?.label}
		</button>

		<!-- Dropdown menu -->
		<div
			bind:this={targetElement}
			class="z-10 hidden w-48 bg-white divide-y divide-neutral-100 rounded-lg shadow dark:bg-neutral-800 dark:divide-neutral-600"
		>
			{#await taskStatusesStore.load() then}
				{#if $taskStatusesStore}
					<ul
						class="p-3 text-md text-neutral-700 dark:text-neutral-200"
						aria-labelledby="dropdownRadioBgHoverButton"
					>
						{#each $taskStatusesStore as $taskStatus ($taskStatus.id)}
							<li>
								<div class="rounded hover:bg-neutral-100 dark:hover:bg-neutral-600">
									<label
										class="flex items-center cursor-pointer w-full text-md rounded text-neutral-700 dark:text-neutral-200 select-none"
									>
										<input
											type="radio"
											value={$taskStatus.id}
											checked={$taskStatus.id === $currentTaskStatusStore.id}
											on:change={() => {
												// Update the individual task
												taskStore.update((value) => {
													if (!value || !$currentTaskStatusStore) return value;
													return {
														...value,
														status_id: $taskStatus.id
													};
												});
												// Update the task in the list
												tasksStore.update((prevVal) => {
													if (!prevVal) return prevVal;
													return prevVal.map((task) => {
														if (task.id === $taskStore?.id) {
															return {
																...task,
																status_id: $taskStatus.id
															};
														}
														return task;
													});
												});
											}}
											name="default-radio"
											class="w-4 h-4 m-2 text-primary-600 bg-neutral-100 border-neutral-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-neutral-700 dark:focus:ring-offset-neutral-700 focus:ring-2 dark:bg-neutral-600 dark:border-neutral-500"
										/>
										<div class="pl-2 p-2">
											{$taskStatus.label}
										</div>
									</label>
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			{/await}
		</div>
	{/if}
{/await}
