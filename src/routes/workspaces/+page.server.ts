import { error, redirect } from '@sveltejs/kit';
import { paths } from '../paths';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { data: workspacesData } = await locals.supabase
    .from('workspaces')
    .select('id')
    .limit(1);

  if (!workspacesData) throw error(404, 'No workspaces found');
  const [firstWorkspace] = workspacesData

  const { data: tasksData } = await locals.supabase
    .from('tasks')
    .select('id')
    .eq('workspace_id', firstWorkspace.id)
    .order('created_at')
    .limit(1);

  if (!tasksData) throw error(404, 'No tasks found');
  const [firstTask] = tasksData;

  throw redirect(302, paths.workspaceTask(firstWorkspace.id, firstTask.id))
};
