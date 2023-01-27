import type { Actions } from './$types';
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

const loginRequestSchema = zfd.formData({
  email: z.string(),
})

export const actions = {
  requestPasswordReset: async ({ request, locals }) => {
    const { supabase } = locals;
    const { email } = loginRequestSchema.parse(await request.formData())
    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: env.PUBLIC_SUPABASE_AUTH_PASSWORD_RESET_REDIRECT_URL,
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
