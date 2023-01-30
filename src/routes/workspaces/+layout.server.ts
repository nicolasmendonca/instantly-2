import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { data: workspacesData, error: supaError, status, statusText } = await locals.supabase
  .from('workspaces')
  .select('*')

  if (supaError) {
    console.error("🚀 ~ file: +layout.server.ts:10 ~ load ~ supaError", supaError)
    throw error(status, {
      message: statusText,
      supaError,
    })
  }

  return {
    workspaces: workspacesData
  }
}) satisfies LayoutServerLoad;
