import { asyncWritable } from '@square/svelte-store';
import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
import { taskIdStore } from './taskIdStore';

export const taskStore = asyncWritable(
	[taskIdStore],
	async ([$taskId]) => await instantlyClient.getTask($taskId),
	async (updatedTask, stores) => {
		const [$taskId] = stores!;
		await instantlyClient.updateTask($taskId, updatedTask);
	}
);