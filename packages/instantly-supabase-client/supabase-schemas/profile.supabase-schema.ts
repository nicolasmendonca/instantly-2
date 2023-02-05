import { z } from 'zod';

export const profileSupabaseSchema = z.object({
  id: z.string(),
  avatar_url: z.string(),
  full_name: z.string(),
})
