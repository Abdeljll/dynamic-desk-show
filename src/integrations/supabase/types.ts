export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      education: {
        Row: {
          created_at: string
          degree: string
          id: string
          institution: string
          location: string
          period: string
          sort_order: number | null
          specializations: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          id?: string
          institution: string
          location: string
          period: string
          sort_order?: number | null
          specializations?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          id?: string
          institution?: string
          location?: string
          period?: string
          sort_order?: number | null
          specializations?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          color: string
          company: string
          created_at: string
          description: string
          icon_name: string
          id: string
          location: string
          period: string
          responsibilities: string[]
          skills: string[]
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          color: string
          company: string
          created_at?: string
          description: string
          icon_name: string
          id?: string
          location: string
          period: string
          responsibilities?: string[]
          skills?: string[]
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          color?: string
          company?: string
          created_at?: string
          description?: string
          icon_name?: string
          id?: string
          location?: string
          period?: string
          responsibilities?: string[]
          skills?: string[]
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          code_url: string | null
          color: string
          created_at: string
          description: string
          features: string[]
          icon_name: string
          id: string
          live_url: string | null
          location: string
          period: string
          sort_order: number | null
          technologies: string[]
          title: string
          updated_at: string
        }
        Insert: {
          code_url?: string | null
          color: string
          created_at?: string
          description: string
          features?: string[]
          icon_name: string
          id?: string
          live_url?: string | null
          location: string
          period: string
          sort_order?: number | null
          technologies?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          code_url?: string | null
          color?: string
          created_at?: string
          description?: string
          features?: string[]
          icon_name?: string
          id?: string
          live_url?: string | null
          location?: string
          period?: string
          sort_order?: number | null
          technologies?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          color: string
          created_at: string
          icon_name: string
          id: string
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          color: string
          created_at?: string
          icon_name: string
          id?: string
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          icon_name?: string
          id?: string
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category_id: string
          created_at: string
          id: string
          level: number
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          level: number
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          level?: number
          name?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
        ]
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
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
