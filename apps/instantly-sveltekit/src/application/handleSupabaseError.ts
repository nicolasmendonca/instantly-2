import type { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';

export function handleSupabaseError(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	postgresResponse: PostgrestResponse<any> | PostgrestSingleResponse<any>
) {
	if (postgresResponse.error) {
		throw error(postgresResponse.status || 500, {
			message: postgresResponse.statusText,
			supaError: postgresResponse.error
		});
	}

	return postgresResponse.data;
}
