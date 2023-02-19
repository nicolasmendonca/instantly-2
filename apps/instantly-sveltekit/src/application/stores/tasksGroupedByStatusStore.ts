import { asyncDerived } from '@square/svelte-store';
import { TASK_SETTINGS } from '../constants';
import { tasksStore } from './tasksStore';
import { taskStatusesStore } from './taskStatusesStore';

export const tasksGroupedByStatusStore = asyncDerived(
	[taskStatusesStore, tasksStore],
	async (stores) => {
		const [$taskStatuses, $tasks] = stores!;

		if (!$taskStatuses || !$tasks) return null;

		const mapped =  $taskStatuses.map((status) => {
			return {
				status,
				tasks: $tasks.filter((task) => task.statusId === status.id)
			};
		});

    const tasksWithoutStatus = $tasks.filter((task) => !task.statusId);

    if (tasksWithoutStatus.length > 0) {
      mapped.push({
        status: {
          id: TASK_SETTINGS.TASK_WITHOUT_STATUS_ID,
          label: TASK_SETTINGS.TASK_WITHOUT_STATUS_LABEL,
        },
        tasks: tasksWithoutStatus
      });
    }

    return mapped;
	},
	{ reloadable: true }
);
