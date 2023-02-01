import { derived } from '@square/svelte-store'
import { taskStatusesStore } from './taskStatusesStore'
import { taskStore } from './taskStore'

export const currentTaskStatusStore = derived(
  [taskStore, taskStatusesStore],
  ([$task, $taskStatuses]) => $taskStatuses?.find(status => status.id === $task?.status_id)
  )
