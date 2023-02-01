import { asyncWritable } from '@square/svelte-store'
import { supabaseClient } from '$src/infrastructure/supabase'

export const workspacesStore = asyncWritable(
  [],
  async () => supabaseClient
    .from('workspaces')
    .select('*')
    .then(res => res.data)
  )
