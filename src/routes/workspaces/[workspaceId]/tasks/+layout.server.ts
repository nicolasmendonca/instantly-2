import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
  const {data: tasks, error: supaError, status, statusText} = await locals.supabase
    .from('tasks')
    .select('*')
    .eq('workspace_id', params.workspaceId)

  if (supaError) {
    throw error(status, {
      message: statusText,
      supaError,
    })
  }

  return {
    tasks
  }
})satisfies LayoutServerLoad;
