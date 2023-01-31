<script lang="ts">
	import { Dropdown } from 'flowbite';
	import { onMount } from 'svelte';

	let triggerElement: HTMLButtonElement;
	let targetElement: HTMLDivElement;

	onMount(() => {
		new Dropdown(targetElement, triggerElement);
	});
</script>

<button
	bind:this={triggerElement}
	type="button"
	class="pointer hover:bg-neutral-600 hover:text-white transition-all flex items-center space-x-2 border text-neutral-300 border-neutral-500 rounded-lg p-2"
>
	<div>Nicolas Mendonca</div>
	<img
		class="w-10 h-10 rounded-full"
		loading="lazy"
		src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
		alt="Rounded avatar"
	/>
</button>

<!-- Dropdown menu -->
<div
	bind:this={targetElement}
	class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-neutral-800 h-[26rem]"
>
	<div class="p-3">
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
	</div>
	<ul
		class="h-full py-2 overflow-y-auto text-neutral-700 dark:text-neutral-200"
		aria-labelledby="dropdownUsersButton"
	>
		<li>
			<a
				href="#"
				class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
			>
				<img
					class="w-6 h-6 mr-2 rounded-full"
					loading="lazy"
					src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
					alt=""
				/>
				Jese Leos
			</a>
		</li>
		<li>
			<a
				href="#"
				class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
			>
				<img
					class="w-6 h-6 mr-2 rounded-full"
					loading="lazy"
					src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
					alt=""
				/>
				Robert Gough
			</a>
		</li>
		<li>
			<a
				href="#"
				class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
			>
				<img
					class="w-6 h-6 mr-2 rounded-full"
					loading="lazy"
					src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
					alt=""
				/>
				Bonnie Green
			</a>
		</li>
		<li>
			<a
				href="#"
				class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
			>
				<img
					class="w-6 h-6 mr-2 rounded-full"
					loading="lazy"
					src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
					alt=""
				/>
				Leslie Livingston
			</a>
		</li>
		<li>
			<a
				href="#"
				class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
			>
				<img
					class="w-6 h-6 mr-2 rounded-full"
					loading="lazy"
					src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
					alt=""
				/>
				Michael Gough
			</a>
		</li>
		<li>
			<a
				href="#"
				class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
			>
				<img
					class="w-6 h-6 mr-2 rounded-full"
					loading="lazy"
					src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
					alt=""
				/>
				Joseph Mcfall
			</a>
		</li>
		<li>
			<a
				href="#"
				class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
			>
				<img
					class="w-6 h-6 mr-2 rounded-full"
					loading="lazy"
					src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
					alt=""
				/>
				Roberta Casas
			</a>
		</li>
		<li>
			<a
				href="#"
				class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
			>
				<img
					class="w-6 h-6 mr-2 rounded-full"
					loading="lazy"
					src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
					alt=""
				/>
				Neil Sims
			</a>
		</li>
	</ul>
</div>
