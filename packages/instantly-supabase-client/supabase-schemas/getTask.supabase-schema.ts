import z from "zod";

export const getTaskSupabaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status_id: z.string().nullable(),
  assignee: z.object({
    id: z.string(),
    full_name: z.string(),
    avatar_url: z.string(),
  }).nullable(),
});
