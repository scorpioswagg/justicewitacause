export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      forum_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_announcement: boolean
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_announcement?: boolean
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_announcement?: boolean
          name?: string
        }
        Relationships: []
      }
      forum_comments: {
        Row: {
          body: string
          created_at: string
          created_by: string
          id: string
          is_hidden: boolean
          topic_id: string
        }
        Insert: {
          body: string
          created_at?: string
          created_by: string
          id?: string
          is_hidden?: boolean
          topic_id: string
        }
        Update: {
          body?: string
          created_at?: string
          created_by?: string
          id?: string
          is_hidden?: boolean
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_comments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "forum_comments_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          body: string
          category_id: string
          created_at: string
          created_by: string
          id: string
          is_hidden: boolean
          title: string
          updated_at: string
        }
        Insert: {
          body: string
          category_id: string
          created_at?: string
          created_by: string
          id?: string
          is_hidden?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          category_id?: string
          created_at?: string
          created_by?: string
          id?: string
          is_hidden?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_topics_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_topics_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          role: Database["public"]["Enums"]["forum_role"]
          status: Database["public"]["Enums"]["forum_profile_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          role?: Database["public"]["Enums"]["forum_role"]
          status?: Database["public"]["Enums"]["forum_profile_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          role?: Database["public"]["Enums"]["forum_role"]
          status?: Database["public"]["Enums"]["forum_profile_status"]
          user_id?: string
        }
        Relationships: []
      }
      submission_files: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          submission_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          submission_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
@@ -117,50 +255,52 @@ export type Database = {
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      forum_profile_status: "pending" | "approved" | "rejected"
      forum_role: "admin" | "user"
      issue_type:
        | "Harassment"
        | "Unsafe Conditions"
        | "Maintenance Neglect"
        | "Discrimination"
        | "Privacy Violations"
        | "Retaliation"
        | "Other"
      submission_status: "new" | "reviewed" | "resolved"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
