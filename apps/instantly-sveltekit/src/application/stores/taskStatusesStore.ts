import { asyncDerived } from '@square/svelte-store';
import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
import { workspaceIdStore } from './workspaceIdStore';

export const taskStatusesStore = asyncDerived(
	[workspaceIdStore],
	async ([$workspaceId]) => await instantlyClient.getTaskStatuses($workspaceId)
);
