import { z } from 'zod';
import { handleSupabaseError } from '$src/application/handleSupabaseError';
import type { Actions } from './$types';
import zfd from 'zod-form-data';

const formDataSchema = zfd.formData({
  text: z.string().min(1)
})

export const actions = {
  sendMessage: async ({ locals, params, request }) => {
    const { text } = formDataSchema.parse(await request.formData())
    const supabaseInsertPromise = locals.supabase
      .from('messages')
      .insert({
        task_id: params.taskId,
        workspace_id: params.workspaceId,
        sender_id: locals.session!.user.id,
        text
      })
    handleSupabaseError(await supabaseInsertPromise)

    return {
      success: true,
    }
  }
} satisfies Actions;
