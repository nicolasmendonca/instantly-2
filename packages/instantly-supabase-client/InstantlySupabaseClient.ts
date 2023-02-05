import type { SupabaseClient as SupabaseClientJs } from '@supabase/supabase-js'
import { getTaskSupabaseSchema } from './supabase-schemas/getTask.supabase-schema';

export class InstantlySupabaseClient {
  public client: SupabaseClientJs;

  constructor(supabaseClient: SupabaseClientJs) {
    this.client = supabaseClient
  }

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
}
