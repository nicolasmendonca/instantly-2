import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { paths } from './paths';

export const load = (async ({ locals }) => {
  if (!locals.session?.user) {
    throw redirect(302, paths.auth.login())
  }

  const [
    {data: workspaces},
    {data: tasks}
  ] = await Promise.all([
    locals.supabase.from('workspaces').select('*').limit(1),
    locals.supabase.from('tasks').select('*').limit(1),
  ])

  throw redirect(302, paths.workspaceTask(workspaces?.[0].id ?? '', tasks?.[0].id ?? ''));
}) satisfies PageServerLoad;
