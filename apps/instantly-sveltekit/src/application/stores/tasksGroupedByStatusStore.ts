import { asyncDerived } from '@square/svelte-store';
import { tasksStore } from './tasksStore';
import { taskStatusesStore } from './taskStatusesStore';

export const tasksGroupedByStatusStore = asyncDerived(
	[taskStatusesStore, tasksStore],
	async (stores) => {
		const [$taskStatuses, $tasks] = stores!;

		if (!$taskStatuses || !$tasks) return null;

		return $taskStatuses.map((status) => {
			return {
				status,
				tasks: $tasks.filter((task) => task.statusId === status.id)
			};
		});
	},
	{ reloadable: true }
);
