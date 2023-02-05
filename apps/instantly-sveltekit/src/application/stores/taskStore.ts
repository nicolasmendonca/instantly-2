import { asyncWritable } from '@square/svelte-store'
import { instantlyClient } from '$src/infrastructure/supabase'
import { taskIdStore } from './taskIdStore'

export const taskStore = asyncWritable(
  [taskIdStore],
  async ([$taskId]) => await instantlyClient.getTask($taskId),
  async (updatedTask, stores, oldValue) => {
    const [$taskId] = stores!
    await instantlyClient.updateTask($taskId, updatedTask)
  }
)

