import type { Actions } from './$types';
import {z} from 'zod'
import {zfd} from 'zod-form-data'
import { fail } from '@sveltejs/kit';

const passwordResetSchema = zfd.formData({
  password: z.string(),
})

export const actions = {
  setPassword: async ({ locals, request }) => {
    const { session, supabase } = locals;

    if (!session) {
      return fail(401, {success: false, message: 'Please follow your email link to reset your password'});
    }

    const { password } = passwordResetSchema.parse(await request.formData())

    const { error } = await supabase.auth.updateUser({
      password,
    })
    
    if (error) {
      return fail(400, {success: false, message: error.message})
    }

    return {
      success: true,
      message: 'Password updated successfully!'
    }
  }
} satisfies Actions;
