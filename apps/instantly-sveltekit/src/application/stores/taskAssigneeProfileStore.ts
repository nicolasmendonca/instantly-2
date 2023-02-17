import { derived } from '@square/svelte-store';
import { taskStore } from './taskStore';


export const taskAssigneeProfileStore = derived(
	[taskStore],
	([$task]) => $task.assignee ? $task.assignee : null,
);
