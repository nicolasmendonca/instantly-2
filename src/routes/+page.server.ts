import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  throw redirect(302, '/workspaces/1/tasks/1');
}) satisfies PageServerLoad;
