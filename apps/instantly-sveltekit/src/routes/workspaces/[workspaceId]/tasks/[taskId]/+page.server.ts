import { InstantlySupabaseClient } from 'instantly-supabase-client';
import { z } from 'zod';
import type { Actions } from './$types';
import zfd from 'zod-form-data';

const formDataSchema = zfd.formData({
  text: z.string().min(1)
})

export const actions = {
  sendMessage: async ({ locals, params, request }) => {
    const { text } = formDataSchema.parse(await request.formData())
    const instantlyClient = new InstantlySupabaseClient(locals.supabase)
    await instantlyClient.sendMessage({
      taskId: params.taskId,
      workspaceId: params.workspaceId,
      text,
    })

    return {
      success: true,
    }
  }
} satisfies Actions;
