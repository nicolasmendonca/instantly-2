<script lang="ts">
	import { page } from '$app/stores';
	import { generateWorkspaceAvatar } from '$src/application/avatar';
	import { workspacesStore } from '$src/application/stores/workspacesStore';
	import { paths } from '$src/routes/paths';
	import Tooltip from '../../../../../components/Tooltip.svelte';

	$: activeWorkspaceId = $page.params.workspaceId;
</script>

<nav
	aria-label="Workspaces navigation menu"
	class="flex h-screen bg-neutral-800 scrollbar-hide snap-mandatory overflow-y-auto overflow-x-hidden snap-y flex-col"
>
	{#await workspacesStore.load() then}
		{#if $workspacesStore}
			{#each $workspacesStore as $workspace ($workspace.id)}
				{@const tooltipId = `tooltip-dark-${$workspace.id}`}
				<a
					href={paths.workspace($workspace.id)}
					class="shrink-0 block relative p-2 group snap-start"
					data-tooltip-target={tooltipId}
					data-tooltip-placement="top"
				>
					<Tooltip label={$workspace.name}>
						<img
							alt={$workspace.name}
							src={generateWorkspaceAvatar($workspace.name)}
							class:grayscale={activeWorkspaceId !== $workspace.id}
							class:opacity-70={activeWorkspaceId !== $workspace.id}
							class:opacity-100={activeWorkspaceId === $workspace.id}
							class:grayscale-0={activeWorkspaceId === $workspace.id}
							class="w-12 h-12 aspect-square rounded-full mx-auto transition-all group-hover:scale-125 grayscale hover:grayscale-0 hover:opacity-100"
						/>
					</Tooltip>
				</a>
			{/each}
		{/if}
	{/await}
</nav>
