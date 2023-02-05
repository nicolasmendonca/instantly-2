import { asyncDerived } from '@square/svelte-store';
import { instantlyClient } from '$src/infrastructure/supabase';
import { taskStore } from './taskStore';

const taskAssigneeIdStore = asyncDerived(
  [taskStore],
  ([$task]) => Promise.resolve($task.assigneeId)
)

export const taskAssigneeProfileStore = asyncDerived(
  [taskAssigneeIdStore],
  ([ $taskAssigneeId ]) => $taskAssigneeId
    ? instantlyClient.getProfile($taskAssigneeId)
    : Promise.resolve(null),
    {
      reloadable: true
    }
)
