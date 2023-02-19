<script lang="ts">
	export let onNewMessage: (text: string) => void;

	let text = '';
</script>

<!-- Chat input -->
<form
	class="sticky bottom-0 w-full right-0"
	method="post"
	action="?/sendMessage"
	on:submit|preventDefault={async () => {
		onNewMessage(text);
		text = '';
	}}
>
	<label for="chat" class="sr-only">Your message</label>
	<div class="flex items-start px-3 py-2 bg-neutral-50 dark:bg-neutral-700">
		<button
			type="button"
			class="inline-flex justify-center p-2 text-neutral-500 rounded-lg cursor-pointer hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-600"
		>
			<svg
				aria-hidden="true"
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
					clip-rule="evenodd"
				/></svg
			>
			<span class="sr-only">Upload image</span>
		</button>
		<button
			type="button"
			class="p-2 text-neutral-500 rounded-lg cursor-pointer hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-600"
		>
			<svg
				aria-hidden="true"
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
					clip-rule="evenodd"
				/></svg
			>
			<span class="sr-only">Add emoji</span>
		</button>
		<input
			bind:value={text}
			autocomplete="off"
			name="text"
			class="block mx-4 p-2.5 w-full text-sm text-neutral-900 bg-white rounded-lg border border-neutral-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
			placeholder="Your message..."
		/>
		<button
			type="submit"
			class="inline-flex justify-center p-2 text-primary-600 rounded-full cursor-pointer hover:bg-primary-100 dark:text-primary-500 dark:hover:bg-neutral-600"
		>
			<svg
				aria-hidden="true"
				class="w-6 h-6 rotate-90"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
				/></svg
			>
			<span class="sr-only">Send message</span>
		</button>
	</div>
</form>
