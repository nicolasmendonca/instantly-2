import type { Actions } from './$types';
import zfd from 'zod-form-data';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { paths, withBaseUrl } from '$src/routes/paths';
import { InstantlySupabaseClient } from 'instantly-supabase-client';

const loginRequestSchema = zfd.formData({
	email: z.string()
});

export const actions = {
	requestPasswordReset: async ({ request, locals }) => {
		const { email } = loginRequestSchema.parse(await request.formData());
		const instantlyClient = new InstantlySupabaseClient(locals.supabase);

		try {
			await instantlyClient.resetPassword({
				email,
				emailRedirectTo: withBaseUrl(paths.auth.setPassword())
			});
			return {
				success: true,
				message: 'We sent you an email to reset your password'
			};
		} catch (error) {
			console.error(error);
			if (error instanceof Error) return fail(400, { success: false, message: error.message });
		}
	}
} satisfies Actions;
