import { asyncWritable } from '@square/svelte-store'
import { supabaseClient } from '$src/infrastructure/supabase'
import { workspaceIdStore } from './workspaceIdStore'

export const taskStatusesStore = asyncWritable(
  [workspaceIdStore],
  async ([$workspaceId]) => await supabaseClient
      .from('taskstatus')
      .select('*')
      .eq('workspace_id', $workspaceId)
      .then(result => result.data)
  )
