<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import debounce from 'debounce';

	let editor: Editor;
	let descriptionElementRef: HTMLDivElement;
	let status: 'idle' | 'changed' | 'saving' | 'saved' = 'idle';
	export let initialValue: string;
	export let updateValue: (html: string) => Promise<void>;

	const handleContentChange = debounce(async () => {
		const html = editor.getHTML();
		await updateValue(html);
		status = 'saved';
	}, 2000);

	onMount(() => {
		editor = new Editor({
			editorProps: {
				attributes: {
					class: 'prose prose-sm dark focus:outline-none break-words'
				}
			},
			element: descriptionElementRef,
			extensions: [
				StarterKit,
				Underline,
				TaskList.configure({
					HTMLAttributes: {
						class: 'task-list-item'
					}
				}),
				TaskItem
			],
			content: initialValue,
			onUpdate: () => {
				editor = editor;
				status = 'saving';
				handleContentChange();
			}
		});
	});
</script>

<div class="relative rounded-lg border-2 border-neutral-500">
	{#if editor}
		<div class="bg-neutral-500 border-b-2 border-b-neutral-500">
			<!-- Bold, italic and underline -->
			<div class="inline-flex rounded-lg border border-neutral-400" role="group">
				<button
					class="p-2 rounded-l-md hover:bg-neutral-400 transition-all"
					aria-label="bold"
					on:click={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					class:bg-neutral-600={editor.isFocused && editor.isActive('bold')}
				>
					<svg class="fill-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
						><path
							d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"
						/></svg
					>
				</button>
				<button
					class="p-2 hover:bg-neutral-400 transition-all"
					aria-label="itali"
					on:click={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					class:bg-neutral-600={editor.isFocused && editor.isActive('italic')}
				>
					<svg class="fill-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
						<path
							d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"
						/></svg
					>
				</button>
				<button
					class="p-2 rounded-r-md hover:bg-neutral-400 transition-all"
					aria-label="underline"
					on:click={() => editor.chain().focus().toggleUnderline().run()}
					disabled={!editor.can().chain().focus().toggleUnderline().run()}
					class:bg-neutral-600={editor.isFocused && editor.isActive('underline')}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill-white w-4 h-4"
						><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
						/></svg
					>
				</button>
			</div>

			<!-- Code -->
			<div class="inline-flex rounded-lg border border-neutral-400" role="group">
				<button
					class="p-2 rounded-l-md hover:bg-neutral-400 transition-all"
					aria-label="code"
					on:click={() => editor.chain().focus().toggleCode().run()}
					disabled={!editor.can().chain().focus().toggleCode().run()}
					class:bg-neutral-600={editor.isFocused && editor.isActive('code')}
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="fill-white w-4 h-4" viewBox="0 0 640 512"
						><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
						/></svg
					>
				</button>
				<button
					class="p-2 rounded-r-md hover:bg-neutral-400 transition-all"
					aria-label="code"
					on:click={() => editor.chain().focus().toggleCodeBlock().run()}
					disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
					class:bg-neutral-600={editor.isFocused && editor.isActive('codeblock')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="fill-white w-4 h-4"
					>
						<path
							fill-rule="evenodd"
							d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4.03 6.28a.75.75 0 00-1.06-1.06L4.97 9.47a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06-1.06L6.56 10l1.72-1.72zm4.5-1.06a.75.75 0 10-1.06 1.06L13.44 10l-1.72 1.72a.75.75 0 101.06 1.06l2.25-2.25a.75.75 0 000-1.06l-2.25-2.25z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>

			<!-- Lists -->
			<div class="inline-flex rounded-lg border border-neutral-400" role="group">
				<button
					class="p-2 rounded-l-md hover:bg-neutral-400 transition-all"
					aria-label="unordered list"
					on:click={() => editor.chain().focus().toggleBulletList().run()}
					disabled={!editor.can().chain().focus().toggleBulletList().run()}
					class:bg-neutral-600={editor.isFocused && editor.isActive('bulletList')}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-white w-4 h-4"
						><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"
						/></svg
					>
				</button>
				<button
					class="p-2 hover:bg-neutral-400 transition-all"
					aria-label="ordered list"
					on:click={() => editor.chain().focus().toggleOrderedList().run()}
					disabled={!editor.can().chain().focus().toggleOrderedList().run()}
					class:bg-neutral-600={editor.isFocused && editor.isActive('orderedList')}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-white w-4 h-4"
						><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
						/></svg
					>
				</button>
				<button
					class="p-2 rounded-r-md hover:bg-neutral-400 transition-all"
					aria-label="task list"
					on:click={() => editor.chain().focus().toggleTaskList().run()}
					disabled={!editor.can().chain().focus().toggleTaskList().run()}
					class:bg-neutral-600={editor.isFocused && editor.isActive('taskList')}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-white w-4 h-4"
						><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
						/></svg
					>
				</button>
			</div>
		</div>
	{/if}
	{#if status !== 'idle'}
		<div transition:fade class="absolute bottom-2 left-2 z-10 capitalize text-neutral-400">
			{status}
		</div>
	{/if}
	<div bind:this={descriptionElementRef} class="editor-container" />
</div>

<style lang="postcss">
	.editor-container :global(.prose) {
		@apply p-2;
	}
</style>
