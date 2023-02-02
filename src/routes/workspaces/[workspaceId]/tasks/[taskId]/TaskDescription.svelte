<script lang="ts">
	import EditorJS from '@editorjs/editorjs';
	// @ts-ignore
	import Header from '@editorjs/header';
	// @ts-ignore
	import Paragraph from '@editorjs/paragraph';
	// @ts-ignore
	import Quote from '@editorjs/quote';
	// @ts-ignore
	import Warning from '@editorjs/warning';
	import { onMount } from 'svelte';

	let descriptionElementRef: HTMLDivElement;

	onMount(() => {
		const editor = new EditorJS({
			holder: descriptionElementRef,
			minHeight: 100,
			hideToolbar: true,
			tools: {
				header: Header,
				paragraph: Paragraph,
				quote: Quote,
				warning: Warning
			}
		});
	});
</script>

<div bind:this={descriptionElementRef} />

<style lang="postcss">
	:global(.ce-popover),
	:global(.ce-popover__item-icon) {
		@apply bg-gray-700 text-white;
	}

	:global(.ce-popover__item:hover) {
		@apply bg-gray-800 !important;
	}

	:global(.ce-popover__item:hover ce-popover__item-icon) {
		@apply border-black;
	}

	:global(.cdx-search-field__input) {
		@apply text-black;
	}

	:global(.ce-toolbar__actions > *) {
		@apply text-gray-300;
	}

	:global(.ce-toolbar__actions > *:hover) {
		@apply text-black;
	}

	:global(.codex-editor__redactor) {
		@apply bg-neutral-600 rounded-md px-2;
	}
</style>
