import { z } from 'zod';

export const getWorkspaceProfilesSupabaseSchema = z.array(z.object({
  profiles: z.object({
    id: z.string(),
    avatar_url: z.string(),
    full_name: z.string(),
  }),
}))
