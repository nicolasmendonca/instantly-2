<script lang="ts">
	type Variants = 'danger' | 'success';

	export let variant: Variants;

	const isDanger = variant === 'danger';
	const isSuccess = variant === 'success';
</script>

<div
	class:border-danger-400={isDanger}
	class:text-danger-800={isDanger}
	class:dark:text-danger-400={isDanger}
	class:border-success-400={isSuccess}
	class:text-success-800={isSuccess}
	class:dark:text-success-400={isSuccess}
	class={'flex border p-4 mb-4 text-sm rounded-lg bg-danger-50 dark:bg-gray-800 '}
	role="alert"
>
	<svg
		aria-hidden="true"
		class="flex-shrink-0 inline w-5 h-5 mr-3"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		><path
			fill-rule="evenodd"
			d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
			clip-rule="evenodd"
		/></svg
	>
	<span class="sr-only">Info</span>
	<div>
		<slot />
	</div>
</div>
