import { redirect } from '@sveltejs/kit';
import { InstantlySupabaseClient } from 'instantly-supabase-client';
import type { PageServerLoad } from './$types';
import { paths } from './paths';

export const load = (async ({ locals }) => {
  if (!locals.session?.user) {
    throw redirect(302, paths.auth.login())
  }

  const instantlySupabaseClient = new InstantlySupabaseClient(locals.supabase)
  
  const [
    workspaceId,
    taskId
  ] = await Promise.all([
    instantlySupabaseClient.getFirstWorkspaceId(),
    instantlySupabaseClient.getFirstTaskId(),
  ])
  throw redirect(302, paths.workspaceTask(workspaceId, taskId));

}) satisfies PageServerLoad;
