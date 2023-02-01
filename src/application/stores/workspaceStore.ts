import { asyncWritable } from '@square/svelte-store'
import { supabaseClient } from '../../infrastructure/supabase'
import { workspaceIdStore } from './workspaceIdStore'

export const workspaceStore = asyncWritable(
  [workspaceIdStore],
  async ([$workspaceId]) => supabaseClient
    .from('workspaces')
    .select('*')
    .eq('id', $workspaceId)
    .single()
    .then(res => res.data)
)
