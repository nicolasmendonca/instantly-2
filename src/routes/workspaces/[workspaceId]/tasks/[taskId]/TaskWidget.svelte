<script>
	import AssigneeButtonDropdown from './AssigneeButtonDropdown.svelte';

	import StatusButtonDropdown from './StatusButtonDropdown.svelte';
</script>

<main class="w-full p-4">
	<h1 class="font-semibold text-2xl max-w-[48rem] mx-4 lg:mx-auto">
		Setup authentication with social accounts
	</h1>
	<hr class="h-px my-3 bg-gray-200 border-0 dark:bg-neutral-500" />

	<div class="my-6" />

	<section
		class="max-w-[48rem] mx-4 lg:mx-auto text-left flex flex-col space-y-4 md:flex-row items-center justify-between"
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
		<h2 class="font-bold text-lg">Description</h2>
		<p class="text-lg font-light mx-auto text-neutral-300">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias et sequi illum non
			consectetur culpa accusamus, neque earum velit nobis sapiente iure doloribus voluptatem cum
			corporis unde provident dolore at.
			<br />
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptas et aperiam architecto, exercitationem
			veritatis. Numquam et corrupti, expedita, laboriosam delectus animi placeat illo reiciendis, atque
			natus ratione nemo officiis.
		</p>
	</section>
</main>
