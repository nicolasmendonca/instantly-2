import './infrastructure/supabase/supabaseClient';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { paths } from './routes/paths';

export const handle: Handle = async ({ event, resolve }) => {
	const { supabaseClient, session } = await getSupabase(event);

	event.locals.supabase = supabaseClient;
	event.locals.session = session;

  if (!event.url.pathname.startsWith('/auth') && !session) {
    throw redirect(303, paths.auth.login())
  }

	return resolve(event);
};
