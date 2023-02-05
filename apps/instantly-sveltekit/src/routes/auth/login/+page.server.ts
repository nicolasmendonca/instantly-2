import { InstantlySupabaseClient } from 'instantly-supabase-client';
import type { Actions } from './$types';
import zfd from 'zod-form-data'
import { z } from 'zod'
import { fail, redirect } from '@sveltejs/kit';
import { paths } from '$src/routes/paths';

const loginRequestSchema = zfd.formData({
  email: z.string(),
  password: z.string(),
})

export const actions = ({
  login: async ({ request, locals }) => {
    const { email, password } = loginRequestSchema.parse(await request.formData());

    try {
      const client = new InstantlySupabaseClient(locals.supabase)
      await client.signInWithPassword({email, password})
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        return fail(401, {incorrect: true, message: error.message})
      }
    }

    throw redirect(302, paths.root())
  }
}) satisfies Actions;
