<script>
	import AssigneeButtonDropdown from './AssigneeButtonDropdown.svelte';

	import StatusButtonDropdown from './StatusButtonDropdown.svelte';
</script>

<div class="bg-neutral-700 h-screen max-h-screen overflow-y-auto">
	<header>
		<div class="px-4 lg:mx-auto h-16 flex items-center justify-between">
			<h1 class="font-semibold text-2xl">Setup authentication with social accounts</h1>
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
			<h2 class="font-bold text-lg">Description:</h2>
			<p class="text-lg font-light mx-auto text-neutral-300">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias et sequi illum non
				consectetur culpa accusamus, neque earum velit nobis sapiente iure doloribus voluptatem cum
				corporis unde provident dolore at.
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptas et aperiam architecto,
				exercitationem veritatis. Numquam et corrupti, expedita, laboriosam delectus animi placeat illo
				reiciendis, atque natus ratione nemo officiis.
			</p>
		</section>
	</div>
</div>
