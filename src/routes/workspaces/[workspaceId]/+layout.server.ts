import { handleSupabaseError } from '$src/application/handleSupabaseError';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({locals, params}) => {
    const [
    workspaceResult,
    taskStatusResult,
    tasksResult,
  ] = await Promise.all([
    locals.supabase
    .from('workspaces')
    .select('*')
    .eq('id', params.workspaceId)
    .single(),
    locals.supabase
      .from('taskstatus')
      .select('*')
      .eq('workspace_id', params.workspaceId),
    locals.supabase
      .from('tasks')
      .select(`
        id,
        title,
        status
      `)
      .eq('workspace_id', params.workspaceId)
  ])

  handleSupabaseError(workspaceResult)
  handleSupabaseError(tasksResult)
  handleSupabaseError(taskStatusResult)

  if ( !tasksResult.data || !taskStatusResult.data) { 
    throw error(500, 'Failed to load task related data')
  }

  if (!workspaceResult.data) { 
    throw error(404, 'Workspace not found')
  }

  return {
    workspace: workspaceResult.data,
    tasks: tasksResult.data ?? [],
    taskStatus: taskStatusResult.data ?? [],
  }
}) satisfies LayoutServerLoad;
