import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { ServerLoad } from '@sveltejs/kit';

export const load = (async (event) => {
	return {
		session: await getServerSession(event)
	};
}) satisfies ServerLoad;
