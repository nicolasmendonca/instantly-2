import { InstantlySupabaseClient } from 'instantly-supabase-client'
import { createClient } from '@supabase/auth-helpers-sveltekit'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const supabaseClient = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY)

export const instantlyClient = new InstantlySupabaseClient(supabaseClient)

