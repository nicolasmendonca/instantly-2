import { InstantlySupabaseClient } from 'instantly-supabase-client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
  const instantlyClient = new InstantlySupabaseClient(locals.supabase);
  return {
    task: instantlyClient.getTask(params.taskId),
    tasks: instantlyClient.getTasks(params.workspaceId),
    workspaces: instantlyClient.getWorkspaces(),
    taskStatuses: instantlyClient.getTaskStatuses(params.workspaceId),
  }
}) satisfies PageServerLoad;
