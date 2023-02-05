import { asyncWritable } from '@square/svelte-store'
import { instantlyClient } from '$src/infrastructure/supabase'

export const workspacesStore = asyncWritable(
  [],
  async () => instantlyClient.getWorkspaces()
  )
