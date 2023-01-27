import type { Actions } from './$types';
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { fail } from '@sveltejs/kit';
import { paths, withBaseUrl } from '$routes/paths';

const loginRequestSchema = zfd.formData({
  email: z.string(),
})

export const actions = {
  requestPasswordReset: async ({ request, locals }) => {
    const { supabase } = locals;
    const { email } = loginRequestSchema.parse(await request.formData())
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: withBaseUrl(paths.auth.setPassword()),
    });

    if (error) {
      return fail(400, { success: false, message: error.message })
    }

    return {
      success: true,
      message: 'We sent you an email to reset your password'
    }
  }
} satisfies Actions;
