import { asyncWritable } from '@square/svelte-store'
import { supabaseClient } from '$src/infrastructure/supabase'
import { workspaceIdStore } from './workspaceIdStore'
import { taskIdStore } from './taskIdStore'
import { derived } from '@square/svelte-store'
import { taskStatusesStore } from './taskStatusesStore'

export const taskStore = asyncWritable(
  [workspaceIdStore, taskIdStore],
  async ([$workspaceId, $taskId]) => await supabaseClient
      .from('tasks')
      .select(`
        id,
        title,
        description,
        status
      `)
      .eq('id', $taskId)
      .eq('workspace_id', $workspaceId)
      .single().then(result => result.data),
      async (updatedTask, stores, cachedTask) => {
        const [$workspaceId, $taskId] = stores!
        supabaseClient
          .from('tasks')
          .update({
            ...cachedTask,
            ...updatedTask
          })
          .eq('id', $taskId)
          .eq('workspace_id', $workspaceId)
          .single()
          .then(result => result.data)
  })

export const currentTaskStatusStore = derived(
  [taskStore, taskStatusesStore],
  ([$task, $taskStatuses]) => $taskStatuses?.find(status => status.id === $task?.status)
  )
