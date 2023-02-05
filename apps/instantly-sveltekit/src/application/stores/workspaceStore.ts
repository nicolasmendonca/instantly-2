import { asyncDerived } from '@square/svelte-store'
import { workspaceIdStore } from './workspaceIdStore'
import { workspacesStore } from './workspacesStore'

export const workspaceStore = asyncDerived(
  [workspacesStore, workspaceIdStore],
  async ([$workspacesList, $workspaceId]) => 
    $workspacesList?.find(workspace => workspace.id === $workspaceId),
)
