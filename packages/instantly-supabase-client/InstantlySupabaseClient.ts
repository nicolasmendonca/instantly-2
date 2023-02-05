import type { SupabaseClient as SupabaseClientJs } from '@supabase/supabase-js'
import { getTaskSupabaseSchema } from './supabase-schemas/getTask.supabase-schema';
import { getWorkspaceProfilesSupabaseSchema } from './supabase-schemas/getWorkspaceProfiles.supabase-schema';
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

  // PROFILEs --------------------------------------------------------------

  async getWorkspaceProfiles(workspaceId: string) {
    const {data, error} = await this.client
    .from('profiles_workspaces')
    .select(`
      profiles ( id, full_name, avatar_url )
    `)
    .eq('workspace_id', workspaceId)

    if (error) throw error
    const parsedResponse = getWorkspaceProfilesSupabaseSchema.parse(data)
    return parsedResponse.map(({profiles}) => {
      return {
        id: profiles.id,
        fullName: profiles.full_name,
        avatarUrl: profiles.avatar_url
      }
    })
  }

  async getProfile(profileId: string) {
    const { data, error } = await this.client
    .from('profiles')
    .select(`
      id,
      full_name,
      avatar_url
    `)
    .eq('id', profileId)
    .single()

    if (error) throw error

    return {
      id: data.id,
      fullName: data.full_name,
      avatarUrl: data.avatar_url
    }
  }

  // WORKSPACES ---------------------------------------------------------------

  // For redirection purposes
  async getFirstWorkspaceId() {
    const { data, error } = await this.client.from('workspaces').select('id').limit(1)
    if (error) throw error;
    return data[0].id
  }

  async getWorkspaces() {
    const { data, error } = await this.client
    .from('workspaces')
    .select(`id, name`)
    if (error) throw error
    return data.map((workspace) => {
      return {
        id: workspace.id,
        name: workspace.name,
      }
    })
  }

  // TASKS --------------------------------------------------------------------

  // For redirection purposes
  async getFirstTaskId() {
    const { data, error } = await this.client.from('tasks').select('id').limit(1)
    if (error) throw error;
    return data[0].id
  }
  
  async getTask(taskId: string) {
    return this.client
      .from('tasks')
      .select(`
        id,
        title,
        description,
        status_id,
        assignee_id
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
          assigneeId: parsedResponse.assignee_id,
        }
      })
  }

  async getTasks(workspaceId: string) {
    const { data, error } = await this.client
      .from('tasks')
      .select(`
        id,
        title,
        status_id
      `)
      .eq('workspace_id', workspaceId)

    if (error) throw error
    return data.map(task => {
      return {
        id: task.id,
        title: task.title,
        statusId: task.status_id,
      }
    })
  }

  async updateTask(taskId: string, {
    title,
    description,
    statusId,
    assigneeId
  }: {
    title?: string,
    description?: string | null,
    statusId?: string,
    assigneeId?: string | null
  }
  ) {
    const { data, error } = await this.client.from('tasks')
    .update({
      title,
      description,
      status_id: statusId,
      assignee_id: assigneeId
    })
    .eq('id', taskId)
    .single()

    if (error) throw error;
  }

  // TASK STATUSES ------------------------------------------------------------
  async getTaskStatuses(workspaceId: string) {
    const {data, error} = await this.client
      .from('taskstatus')
      .select('id, label')
      .eq('workspace_id', workspaceId)

    if (error) throw error
    return data.map((status) => {
      return {
        id: status.id,
        label: status.label,
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
