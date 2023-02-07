<script lang="ts">
	import {
		createEditor,
		type LexicalEditor,
		ParagraphNode,
		$getRoot as getRoot,
		$getSelection as getSelection
	} from 'lexical';
	import { registerRichText } from '@lexical/rich-text';
	import { CodeNode, CodeHighlightNode, registerCodeHighlighting } from '@lexical/code';
	import { registerHistory, createEmptyHistoryState } from '@lexical/history';
	import { LinkNode } from '@lexical/link';
	import { ListNode, ListItemNode, INSERT_ORDERED_LIST_COMMAND } from '@lexical/list';
	import { TableNode, TableRowNode, TableCellNode } from '@lexical/table';

	// import debounce from 'debounce';
	import '$src/editor.css';
	import { taskStore } from '$src/application/stores/taskStore';
	import { onMount } from 'svelte';
	import ListButton from './Editor/ListButton.svelte';
	import { setEditorContext } from './Editor/context';

	let descriptionElementRef: HTMLDivElement;
	let status: 'idle' | 'changed' | 'saving' | 'saved' = 'idle';
	let editor = createEditor({
		nodes: [
			ParagraphNode,
			CodeNode,
			CodeHighlightNode,
			LinkNode,
			ListNode,
			ListItemNode,
			TableNode,
			TableRowNode,
			TableCellNode
		]
	});

	// const handleDescriptionChange = debounce((editor: EditorJS) => {
	// 	status = 'saving';
	// 	editor.save().then(async (output) => {
	// 		await taskStore.update((task) => {
	// 			task.description = JSON.stringify(output);

	// 			return task;
	// 		});
	// 		status = 'saved';
	// 	});
	// }, 2000);

	setEditorContext(editor);

	onMount(async () => {
		editor.setRootElement(descriptionElementRef);

		registerRichText(editor);
		registerCodeHighlighting(editor);
		registerHistory(editor, createEmptyHistoryState(), 2000);

		// const task = await taskStore.load();
		// if (task.description) editor.parseEditorState(task.description);
		editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				console.log(getRoot().getTextContent(), getSelection());
			});
		});
	});
</script>

<div class="relative pt-4 group">
	<div class="group-focus-within:outline outline-primary-500 rounded-lg">
		<!-- <div class="absolute bottom-2 left-2 z-10 capitalize text-neutral-400">
      {status}
	</div> -->
		<div class="h-12 flex items-center w-full bg-neutral-600 rounded-t-lg">
			<ListButton />
		</div>
		<div
			bind:this={descriptionElementRef}
			contenteditable
			class="prose editor-content py-2 min-h-[12em] focus:outline-none rounded-b-lg w-full bg-neutral-800 prose-headings:text-white prose-blockquote:text-white text-white"
		/>
	</div>
</div>

<style lang="postcss">
	:global(.editor-content li) {
		@apply my-0;
	}
</style>
