<button
	data-dropdown-toggle="task-status-dropdown-select"
	class="pointer hover:bg-neutral-600 hover:text-white transition-all border py-2 text-neutral-300 border-neutral-500 rounded-lg inline-block p-2 leading-loose"
>
	In Progress
</button>

<!-- Dropdown menu -->
<div
	id="task-status-dropdown-select"
	class="z-10 hidden w-48 bg-white divide-y divide-neutral-100 rounded-lg shadow dark:bg-neutral-700 dark:divide-neutral-600"
>
	<ul
		class="p-3 space-y-1 text-sm text-neutral-700 dark:text-neutral-200"
		aria-labelledby="dropdownRadioBgHoverButton"
	>
		<li>
			<div class="flex items-center pl-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-600">
				<input
					id="status-radio-in-backlog"
					type="radio"
					value=""
					name="default-radio"
					class="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-neutral-700 dark:focus:ring-offset-neutral-700 focus:ring-2 dark:bg-neutral-600 dark:border-neutral-500"
				/>
				<label
					for="status-radio-in-backlog"
					class="w-full ml-2 p-2 text-sm font-medium text-neutral-900 rounded dark:text-neutral-300"
					>In Backlog</label
				>
			</div>
		</li>
		<li>
			<div class="flex items-center pl-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-600">
				<input
					id="status-radio-in-progress"
					type="radio"
					value=""
					checked
					name="default-radio"
					class="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-neutral-700 dark:focus:ring-offset-neutral-700 focus:ring-2 dark:bg-neutral-600 dark:border-neutral-500"
				/>
				<label
					for="status-radio-in-progress"
					class="w-full ml-2 p-2 text-sm font-medium text-neutral-900 rounded dark:text-neutral-300"
					>In Progress</label
				>
			</div>
		</li>
		<li>
			<div class="flex items-center pl-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-600">
				<input
					id="status-radio-done"
					type="radio"
					value=""
					name="default-radio"
					class="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-neutral-700 dark:focus:ring-offset-neutral-700 focus:ring-2 dark:bg-neutral-600 dark:border-neutral-500"
				/>
				<label
					for="status-radio-done"
					class="w-full ml-2 p-2 text-sm font-medium text-neutral-900 rounded dark:text-neutral-300"
					>Done</label
				>
			</div>
		</li>
	</ul>
</div>
