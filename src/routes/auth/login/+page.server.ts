import type { Actions } from './$types';
import zfd from 'zod-form-data'
import { z } from 'zod'
import { fail, redirect } from '@sveltejs/kit';
import { paths } from '$routes/paths';

const loginRequestSchema = zfd.formData({
  email: z.string(),
  password: z.string(),
})

export const actions = ({
  login: async ({ request, locals }) => {
    const { supabase } = locals;
    const { email, password } = loginRequestSchema.parse(await request.formData());

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return fail(401, {incorrect: true, message: error.message})
    }

    throw redirect(302, paths.root())
  }
}) satisfies Actions;
