<script lang="ts">
	import debounce from 'debounce';
	import EditorJS from '@editorjs/editorjs';
	// @ts-ignore
	import Header from '@editorjs/header';
	// @ts-ignore
	import Paragraph from '@editorjs/paragraph';
	// @ts-ignore
	import InlineCode from '@editorjs/inline-code';
	// @ts-ignore
	import CodeBox from '@bomdi/codebox';
	import { onMount } from 'svelte';
	import '$src/editor.css';
	import { taskStore } from '$src/application/stores/taskStore';

	let descriptionElementRef: HTMLDivElement;
	let status: 'idle' | 'changed' | 'saving' | 'saved' = 'idle';

	const handleDescriptionChange = debounce((editor: EditorJS) => {
		editor.save().then(async (output) => {
			await taskStore.update((task) => {
				task.description = JSON.stringify(output);

				return task;
			});
			status = 'saved';
		});
	}, 2000);

	onMount(() => {
		const editor: EditorJS = new EditorJS({
			holder: descriptionElementRef,
			onChange: () => {
				status = 'saving';
				handleDescriptionChange(editor);
			},
			minHeight: 100,
			data: $taskStore.description ? JSON.parse($taskStore.description) : undefined,
			tools: {
				header: {
					class: Header,
					inlineToolbar: true
				},
				paragraph: {
					class: Paragraph,
					inlineToolbar: true
				},
				inlineCode: {
					class: InlineCode
				},
				codeBox: {
					class: CodeBox,
					config: {
						themeName: 'atom-one-dark'
					}
				}
			}
		});
	});
</script>

<div class="relative pt-4">
	<div class="absolute bottom-2 left-2 z-10 capitalize text-neutral-400">
		{status}
	</div>
	<div
		bind:this={descriptionElementRef}
		class="prose prose-headings:text-white prose-blockquote:text-white text-white"
	/>
</div>
