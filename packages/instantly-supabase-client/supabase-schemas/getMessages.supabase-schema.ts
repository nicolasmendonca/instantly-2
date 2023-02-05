import { z } from "zod";
import { profileSupabaseSchema } from "./profile.supabase-schema";

export const getMessagesSupabaseSchema = z.array(
  z.object({
    id: z.string(),
    sender_id: profileSupabaseSchema,
    text: z.string(),
    created_at: z.string(),
  })
);
