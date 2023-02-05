import { z } from 'zod';

export const messageSubscriptionSupabaseSchema = z.object({
  new: z.object({
    id: z.string(),
    sender_id: z.string(),
    sender_full_name: z.string(),
    sender_avatar_url: z.string(),
    text: z.string(),
    created_at: z.string()
  })
})
