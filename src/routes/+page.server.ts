import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { paths } from './paths';

export const load = (async () => {
  throw redirect(302, paths.workspaces());
}) satisfies PageServerLoad;
