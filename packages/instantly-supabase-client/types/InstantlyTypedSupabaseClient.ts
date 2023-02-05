import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './__generated';

export type InstantlyTypedSupabaseClient = SupabaseClient<Database>
