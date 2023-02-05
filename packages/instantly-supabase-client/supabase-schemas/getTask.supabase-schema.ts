import z from 'zod'

export const getTaskSupabaseSchema = z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      status_id: z.string(),
      assignee_id: z.string().nullable()
    })
