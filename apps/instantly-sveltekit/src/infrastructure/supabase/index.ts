import { InstantlySupabaseClient } from 'instantly-supabase-client'
import { createClient } from '@supabase/auth-helpers-sveltekit'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

export const supabaseClient: SupabaseClient<Database> = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY)

const client = new InstantlySupabaseClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

