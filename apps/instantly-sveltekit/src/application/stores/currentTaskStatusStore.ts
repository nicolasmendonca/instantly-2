import { asyncDerived } from '@square/svelte-store';
import { taskStatusesStore } from './taskStatusesStore';
import { taskStore } from './taskStore';

export const currentTaskStatusStore = asyncDerived(
	[taskStore, taskStatusesStore],
	([$task, $taskStatuses]) =>
		Promise.resolve($taskStatuses.find((status) => status.id === $task.statusId))
);
