import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { data: workspacesData, error: supaError, status } = await locals.supabase
  .from('workspaces')
  .select('*')

  if (supaError) {
    throw error(status, supaError)
  }

  return {
    workspaces: workspacesData
  }
}) satisfies LayoutServerLoad;
