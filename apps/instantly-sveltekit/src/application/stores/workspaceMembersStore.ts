import { asyncWritable } from '@square/svelte-store'
import { instantlyClient } from '$src/infrastructure/supabase'
import { workspaceIdStore } from './workspaceIdStore'

export const workspaceMembersStore = asyncWritable(
  [workspaceIdStore],
  async ([$workspaceId]) => instantlyClient.getWorkspaceProfiles($workspaceId)
)
