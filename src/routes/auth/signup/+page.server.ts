import type { Actions } from './$types';
import zfd from 'zod-form-data'
import { z } from 'zod'
import { fail } from '@sveltejs/kit';
import { withBaseUrl, paths } from '$routes/paths';

const loginRequestSchema = zfd.formData({
  email: z.string(),
  password: z.string(),
})

export const actions = ({
  signup: async ({ request, locals }) => {
    const { supabase } = locals;
    const { email, password } = loginRequestSchema.parse(await request.formData());

    const signUpOptions = {
      emailRedirectTo: withBaseUrl(paths.auth.confirmSignUp())
    }

    const { data, error } = await supabase.auth.signUp({ email, password, options: signUpOptions })

    if (error) {
      return fail(401, {success: false, message: error.message})
    }

    return {
      success: true,
      message: 'Done! Please check your email to confirm your account.',
      user: data.user
    }
  }
}) satisfies Actions;
