import type { SupabaseClient as SupabaseClientJs } from '@supabase/supabase-js'
import { getTaskSupabaseSchema } from './supabase-schemas/getTask.supabase-schema';
import { Database } from './types/__generated';

export class InstantlySupabaseClient {
  public client: SupabaseClientJs<Database>;

  constructor(supabaseClient: SupabaseClientJs) {
    this.client = supabaseClient
  }

  // AUTH --------------------------------------------------------------
  async getAuthUser() {
    return this.client.auth.getSession().then(res => res.data.session?.user)
  }

  async signInWithPassword({ email, password }: {email: string, password: string}) {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password })
    if (error) throw error;
    return data.user;
  }

  async signUpWithPassword({ email, password, emailRedirectTo }: {email: string, password: string, emailRedirectTo?: string}) {
    const { data, error } = await this.client.auth.signUp({ email, password , options: {
      emailRedirectTo
    } })
    if (error) throw error;
    return data.user;
  }

  async resetPassword({ email, emailRedirectTo }: { email: string, emailRedirectTo?: string }) {
    const { data, error } = await this.client.auth.resetPasswordForEmail(email, {
      redirectTo: emailRedirectTo
    })
    if (error) throw error;
    return data;
  }

  onAuthStateChange(callback: () => void) {
    return this.client.auth.onAuthStateChange(callback)
  }

  // WORKSPACES ---------------------------------------------------------------

  // For redirection purposes
  async getFirstWorkspaceId() {
    const { data, error } = await this.client.from('workspaces').select('id').limit(1)
    if (error) throw error;
    return data[0].id
  }

  // TASKS --------------------------------------------------------------------

  // For redirection purposes
  async getFirstTaskId() {
    const { data, error } = await this.client.from('tasks').select('id').limit(1)
    if (error) throw error;
    return data[0].id
  }
  
  async getTask(taskId: string) {
    this.client
      .from('tasks')
      .select(`
        id,
        title,
        description,
        status_id,
        assignee_id,
        profiles ( id, full_name, avatar_url)
      `)
      .eq('id', taskId)
      .single()
      .then(result => {
        const parsedResponse = getTaskSupabaseSchema.parse(result.data)
        return {
          id: parsedResponse.id,
          title: parsedResponse.title,
          description: parsedResponse.description,
          statusId: parsedResponse.status_id,
          assignee: {
            id: parsedResponse.profiles.id,
            fullName: parsedResponse.profiles.full_name,
            avatarUrl: parsedResponse.profiles.avatar_url
          }
        }
      })
  }

  // MESSAGES -----------------------------------------------------------------
  async sendMessage({ taskId, workspaceId, text }: { taskId: string, workspaceId: string, text: string }) {
    const user = await this.getAuthUser()
    if (!user) throw new UserNotAuthenticatedError()
    const { error } = await this.client
      .from('messages')
      .insert({
        task_id: taskId,
        workspace_id: workspaceId,
        sender_id: user.id,
        text
      })
    if (error) throw error;
  }
}

class UserNotAuthenticatedError extends Error {}
