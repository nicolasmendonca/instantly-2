export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      profiles_workspaces: {
        Row: {
          created_at: string
          profile_id: string
          role: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string
          profile_id: string
          role?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string
          profile_id?: string
          role?: string | null
          workspace_id?: string
        }
      }
      tasks: {
        Row: {
          assignee: string | null
          created_at: string
          description: string | null
          id: string
          status: string | null
          title: string
          workspace_id: string
        }
        Insert: {
          assignee?: string | null
          created_at?: string
          description?: string | null
          id?: string
          status?: string | null
          title: string
          workspace_id: string
        }
        Update: {
          assignee?: string | null
          created_at?: string
          description?: string | null
          id?: string
          status?: string | null
          title?: string
          workspace_id?: string
        }
      }
      taskstatus: {
        Row: {
          created_at: string | null
          id: string
          label: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          label?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string | null
          workspace_id?: string
        }
      }
      workspaces: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          owner: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          owner?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          owner?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
