import { asyncWritable } from '@square/svelte-store';
import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
import { taskIdStore } from './taskIdStore';
import { workspaceMembersStore } from './workspaceMembersStore';

export const taskStore = asyncWritable(
	[taskIdStore, workspaceMembersStore],
	async ([$taskId]) => await instantlyClient.getTask($taskId),
	async (updatedTask, stores) => {
		const [$taskId] = stores!;
		await instantlyClient.updateTask($taskId, updatedTask);
	},
  {
    reloadable: true
  }
);

export async function updateTaskAssignee(assigneeId: string | null, assignee: {
  id: string;
  fullName: string;
  avatarUrl: string;
} | null = null, revalidate = true) {
  taskStore.update((task) => {
    let taskWithAssignee = {
      ...task,
      assigneeId,
    }

    // Used for optimistic update
    if (assignee) {
      taskWithAssignee = {
        ...taskWithAssignee,
        assignee,
      }
    }

    return taskWithAssignee;
  })

  if (revalidate) {
    await taskStore.reload?.();
  }
}

export async function updateTaskStatus(statusId: string, revalidate = true) {
  taskStore.update((task) => ({
    ...task,
    statusId,
  }))

  if (revalidate) {
    await taskStore.reload?.();
  }
}

export async function updateTaskDescription(description: string, revalidate = true) {
  taskStore.update((task) => ({
    ...task,
    description,
  }))

  if (revalidate) {
    await taskStore.reload?.();
  }
}

export async function updateTaskTitle(title: string, revalidate = true) {
  taskStore.update((task) => ({
    ...task,
    title,
  }))

  if (revalidate) {
    await taskStore.reload?.();
  }
}
