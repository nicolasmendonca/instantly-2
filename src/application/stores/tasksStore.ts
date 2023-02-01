import { asyncWritable } from '@square/svelte-store';
import { supabaseClient } from '$src/infrastructure/supabase';
import { workspaceIdStore } from './workspaceIdStore';

export const tasksStore = asyncWritable(
  [workspaceIdStore],
  async ([$workspaceId]) => supabaseClient
      .from('tasks')
      .select(`
        id,
        title,
        status
      `)
      .eq('workspace_id', $workspaceId)
      .then(res => res.data),
      async (updatedTasks) => updatedTasks
)
