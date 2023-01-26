// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit/dist/types';
import type { Session } from "@supabase/supabase-js"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: TypedSupabaseClient;
			session: Session | null;
		}

		interface PageData {
			session: Session | null
		}
		// interface Platform {}
	}
}

export {};
