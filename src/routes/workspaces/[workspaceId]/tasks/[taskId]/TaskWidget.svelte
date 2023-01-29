<script>
	import { slide } from 'svelte/transition';
	import AssigneeButtonDropdown from './AssigneeButtonDropdown.svelte';

	import StatusButtonDropdown from './StatusButtonDropdown.svelte';

	let metadataExpanded = true;
</script>

<main class="w-full">
	<header class="flex items-center justify-between max-w-[48rem] mx-4 lg:mx-auto h-16">
		<h1 class="font-semibold text-2xl">Setup authentication with social accounts</h1>

		<button
			class="border border-neutral-500 rounded-lg h-7 w-7 hover:bg-neutral-600"
			on:click={() => {
				metadataExpanded = !metadataExpanded;
			}}
		>
			<div class="transition-all" class:rotate-180={metadataExpanded}>▲</div>
		</button>
	</header>
	<hr class="h-px bg-gray-200 border-0 dark:bg-neutral-500" />

	{#if metadataExpanded}
		<div transition:slide class="bg-neutral-700 pt-6 pb-10">
			<section
				class="max-w-[48rem] mx-4 lg:mx-auto text-left flex flex-col space-y-4 md:flex-row justify-between"
			>
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

			<section class="max-w-[48rem] mx-4 lg:mx-auto">
				<h2 class="font-bold text-lg">Description:</h2>
				<p class="text-lg font-light mx-auto text-neutral-300">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias et sequi illum non
					consectetur culpa accusamus, neque earum velit nobis sapiente iure doloribus voluptatem
					cum corporis unde provident dolore at.
					<br />
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptas et aperiam architecto,
					exercitationem veritatis. Numquam et corrupti, expedita, laboriosam delectus animi placeat
					illo reiciendis, atque natus ratione nemo officiis.
				</p>
			</section>
		</div>
	{/if}

	<section />
</main>
