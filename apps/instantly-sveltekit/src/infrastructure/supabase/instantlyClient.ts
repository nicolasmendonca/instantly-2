import { InstantlySupabaseClient } from 'instantly-supabase-client';
import { supabaseClient } from './supabaseClient';

export const instantlyClient = new InstantlySupabaseClient(supabaseClient);
