import { asyncWritable } from '@square/svelte-store'
import { supabaseClient } from '$src/infrastructure/supabase'
import { workspaceIdStore } from './workspaceIdStore'
import { taskIdStore } from './taskIdStore'

import { z } from 'zod'

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status_id: z.string(),
  assignee_id: z.string().nullable(),
  profiles: z.object({
    id: z.string(),
    full_name: z.string().nullable(),
    avatar_url: z.string().nullable()
  }).nullable()
})

export const taskStore = asyncWritable(
  [workspaceIdStore, taskIdStore],
  async ([$workspaceId, $taskId]) => await supabaseClient
    .from('tasks')
    .select(`
      id,
      title,
      description,
      status_id,
      assignee_id,
      profiles ( id, full_name, avatar_url)
    `)
    .eq('id', $taskId)
    .eq('workspace_id', $workspaceId)
    .single()
    .then(result => taskSchema.parse(result.data)),
  async (updatedTask, stores) => {
      const [$workspaceId, $taskId] = stores!
      supabaseClient
        .from('tasks')
        .update({
          assignee_id: updatedTask.assignee_id,
          status_id: updatedTask.status_id,
        })
        .eq('id', $taskId)
        .eq('workspace_id', $workspaceId)
        .single()
        .then(result => result.data)
  }
)

