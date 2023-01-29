<script lang="ts">
	import { page } from '$app/stores';

	$: activeWorkspaceId = Number($page.params.workspaceId);

	export let position: 'left' | 'right' | 'top' | 'bottom' = 'left';
	$: isVertical = ['left', 'right'].includes(position);
	$: isHorizontal = ['top', 'bottom'].includes(position);

	export let workspacesLinks = Array.from({ length: 20 }, (_, i) => {
		const id = i + 1;
		return {
			id: id,
			href: `/workspaces/${id}/tasks/1`,
			label: `Long Workspace Name ${id}`,
			imageSrc: `https://ui-avatars.com/api/?rounded=true&name=workspace+${id}&background=ea580c&color=ffffff`
		};
	});
</script>

<nav
	aria-label="Workspaces navigation menu"
	class:left-0={position === 'left'}
	class:right-0={position === 'right'}
	class:top-0={position === 'top'}
	class:bottom-0={position === 'bottom'}
	class:h-screen={isVertical}
	class:overflow-y-auto={isVertical}
	class:overflow-y-hidden={isHorizontal}
	class:overflow-x-scroll={isHorizontal}
	class:overflow-x-hidden={isVertical}
	class:w-screen={isHorizontal}
	class:snap-y={isVertical}
	class:snap-x={isHorizontal}
	class:flex-col={isVertical}
	class="fixed flex bg-slate-900 scrollbar-hide snap-mandatory break-avoid"
>
	{#each workspacesLinks as workspaceLink (workspaceLink.id)}
		{@const tooltipId = `tooltip-dark-${workspaceLink.id}`}
		<a
			href={workspaceLink.href}
			class="shrink-0 block relative p-2 group snap-start"
			data-tooltip-target={tooltipId}
			data-tooltip-placement="top"
		>
			<img
				alt={workspaceLink.label}
				src={workspaceLink.imageSrc}
				class:grayscale={activeWorkspaceId !== workspaceLink.id}
				class:opacity-70={activeWorkspaceId !== workspaceLink.id}
				class:opacity-100={activeWorkspaceId === workspaceLink.id}
				class:grayscale-0={activeWorkspaceId === workspaceLink.id}
				class="w-12 h-12 aspect-square rounded-full mx-auto transition-all group-hover:scale-125 grayscale hover:grayscale-0 hover:opacity-100"
			/>
			<div
				id={tooltipId}
				role="tooltip"
				class="absolute text-center z-10 invisible inline-block py-2 text-xs font-medium overflow-ellipsis whitespace-pre-wrap w-16 text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
			>
				{workspaceLink.label}
				<div class="tooltip-arrow" data-popper-arrow />
			</div>
		</a>
	{/each}
</nav>
<div
	class:ml-16={position === 'left'}
	class:mr-16={position === 'right'}
	class:mt-16={position === 'top'}
	class:mb-16={position === 'bottom'}
>
	<slot />
</div>
