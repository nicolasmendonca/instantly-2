// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Session, SupabaseClient } from "@supabase/supabase-js"
import type { Database } from './infrastructure/supabase/types'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			session: Session | null;
		}

		interface PageData {
			session: Session | null
		}
		// interface Platform {}
	}
}

export {};
