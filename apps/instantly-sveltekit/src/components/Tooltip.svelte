<script lang="ts">
	import { Tooltip } from 'flowbite';
	import { onMount } from 'svelte';

	let tooltipRef: HTMLElement;
	let triggerElement: HTMLElement;

	export let label: string;

	onMount(() => {
		new Tooltip(tooltipRef, triggerElement);
	});
</script>

<div bind:this={triggerElement}>
	<slot />
</div>

<div
	bind:this={tooltipRef}
	role="tooltip"
	class="absolute text-center z-10 invisible inline-block py-2 text-xs font-medium overflow-ellipsis whitespace-pre-wrap w-16 text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
>
	{label}
	<div class="tooltip-arrow" data-popper-arrow />
</div>
