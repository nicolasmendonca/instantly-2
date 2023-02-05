import type { Actions } from './$types';
import zfd from 'zod-form-data'
import { z } from 'zod'
import { fail } from '@sveltejs/kit';
import { withBaseUrl, paths } from '$src/routes/paths';
import { InstantlySupabaseClient } from 'instantly-supabase-client';

const loginRequestSchema = zfd.formData({
  email: z.string(),
  password: z.string(),
})

export const actions = ({
  signup: async ({ request, locals }) => {
    const { supabase } = locals;
    const { email, password } = loginRequestSchema.parse(await request.formData());

    const instantlyClient = new InstantlySupabaseClient(supabase)

    try {
      await instantlyClient.signUpWithPassword({ email, password, emailRedirectTo: withBaseUrl(paths.auth.confirmSignUp()) })
      return {
        success: true,
        message: 'Done! Please check your email to confirm your account.',
      }
    } catch (error) {
      console.error(error)
      if (error instanceof Error) return fail(401, {success: false, message: error.message})
    }

  }
}) satisfies Actions;
