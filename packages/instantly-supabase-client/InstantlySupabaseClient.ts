import { createClient, type SupabaseClient as SupabaseClientJs } from '@supabase/supabase-js'
import { getTaskSupabaseSchema } from './supabase-schemas/getTask.supabase-schema';

export class InstantlySupabaseClient {
  private client: SupabaseClientJs;

  constructor(supabaseUrl: string, supabaseAnonKey: string) {
    this.client = createClient(supabaseUrl, supabaseAnonKey)
  }
  
  public getTask(taskId: string) {
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
