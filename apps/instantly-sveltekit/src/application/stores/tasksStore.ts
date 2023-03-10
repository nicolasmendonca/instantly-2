import { asyncWritable } from '@square/svelte-store';
import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
import { workspaceIdStore } from './workspaceIdStore';

export const tasksStore = asyncWritable(
	[workspaceIdStore],
	async ([$workspaceId]) => instantlyClient.getTasks($workspaceId),
	// Accept a function that takes any updated promises to update the UI without performing extra requests
	async (updatedTasks) => updatedTasks
);

export async function updateTaskStatusFromList(taskId: string, statusId: string, revalidate = true) {
  tasksStore.update((tasks) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          statusId,
        };
      }

      return task;
    });

    return updatedTasks;
  });

  if (revalidate) {
    await tasksStore.reload?.();
  }
}
