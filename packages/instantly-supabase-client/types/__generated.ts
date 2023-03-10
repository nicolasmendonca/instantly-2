export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          created_at: string;
          id: string;
          sender_avatar_url: string;
          sender_full_name: string;
          sender_id: string;
          task_id: string;
          text: string;
          workspace_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          sender_avatar_url: string;
          sender_full_name: string;
          sender_id: string;
          task_id: string;
          text: string;
          workspace_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          sender_avatar_url?: string;
          sender_full_name?: string;
          sender_id?: string;
          task_id?: string;
          text?: string;
          workspace_id?: string;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
      };
      profiles_workspaces: {
        Row: {
          created_at: string;
          profile_id: string;
          role: string | null;
          workspace_id: string;
        };
        Insert: {
          created_at?: string;
          profile_id: string;
          role?: string | null;
          workspace_id: string;
        };
        Update: {
          created_at?: string;
          profile_id?: string;
          role?: string | null;
          workspace_id?: string;
        };
      };
      tasks: {
        Row: {
          assignee_id: string | null;
          created_at: string;
          description: string | null;
          id: string;
          status_id: string;
          title: string;
          workspace_id: string;
        };
        Insert: {
          assignee_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          status_id: string;
          title: string;
          workspace_id: string;
        };
        Update: {
          assignee_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          status_id?: string;
          title?: string;
          workspace_id?: string;
        };
      };
      taskstatus: {
        Row: {
          created_at: string | null;
          id: string;
          label: string;
          workspace_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          label: string;
          workspace_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          label?: string;
          workspace_id?: string;
        };
      };
      workspaces: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          owner: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          owner?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          owner?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
