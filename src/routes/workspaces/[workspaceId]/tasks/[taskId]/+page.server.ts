import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'

export const load = (async ({ locals, params }) => {
  const {data: task, error: supaError, status, statusText} = await locals.supabase
    .from('tasks')
    .select('*')
    .eq('id', params.taskId)
    .eq('workspace_id', params.workspaceId)
    .single()

  if (supaError) {
    throw error(status, {
      message: statusText,
      supaError,
    })
  }

  return {
    task: task
  }
})satisfies PageServerLoad;
