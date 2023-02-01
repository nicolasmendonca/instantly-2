import { asyncWritable } from '@square/svelte-store'
import { z } from 'zod'
import { supabaseClient } from '../../infrastructure/supabase'
import { workspaceIdStore } from './workspaceIdStore'

export const workspaceMemberSchema = z.array(z.object({
  profiles: z.object({
    id: z.string(),
    avatar_url: z.string(),
    full_name: z.string(),
  })
}))

export const workspaceMembersStore = asyncWritable(
  [workspaceIdStore],
  async ($workspaceId) => supabaseClient
    .from('profiles_workspaces')
    .select(`
      profiles ( id, full_name, avatar_url )
    `)
    .eq('workspace_id', $workspaceId)
    // .textSearch('profiles.full_name', '*')
    .then(res => workspaceMemberSchema.parse(res.data))
)
