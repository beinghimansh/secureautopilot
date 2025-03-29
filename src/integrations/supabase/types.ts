export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_findings: {
        Row: {
          audit_id: string
          created_at: string
          description: string
          id: string
          organization_id: string
          remediation: string | null
          severity: string
          status: string
          updated_at: string
        }
        Insert: {
          audit_id: string
          created_at?: string
          description: string
          id?: string
          organization_id: string
          remediation?: string | null
          severity: string
          status?: string
          updated_at?: string
        }
        Update: {
          audit_id?: string
          created_at?: string
          description?: string
          id?: string
          organization_id?: string
          remediation?: string | null
          severity?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_findings_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_findings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      audits: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          framework_id: string | null
          id: string
          organization_id: string
          start_date: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          framework_id?: string | null
          id?: string
          organization_id: string
          start_date: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          framework_id?: string | null
          id?: string
          organization_id?: string
          start_date?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audits_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "compliance_frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audits_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          business_location: string | null
          company_size: string
          created_at: string
          created_by: string | null
          data_types: string
          id: string
          industry: string
          infrastructure_details: string | null
          name: string
          organization_id: string | null
          risk_appetite: string | null
          security_controls: string[] | null
          updated_at: string
        }
        Insert: {
          business_location?: string | null
          company_size: string
          created_at?: string
          created_by?: string | null
          data_types: string
          id?: string
          industry: string
          infrastructure_details?: string | null
          name: string
          organization_id?: string | null
          risk_appetite?: string | null
          security_controls?: string[] | null
          updated_at?: string
        }
        Update: {
          business_location?: string | null
          company_size?: string
          created_at?: string
          created_by?: string | null
          data_types?: string
          id?: string
          industry?: string
          infrastructure_details?: string | null
          name?: string
          organization_id?: string | null
          risk_appetite?: string | null
          security_controls?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      compliance_frameworks: {
        Row: {
          created_at: string
          enabled: boolean
          framework_type: Database["public"]["Enums"]["framework_type"]
          id: string
          organization_id: string
          progress: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          framework_type: Database["public"]["Enums"]["framework_type"]
          id?: string
          organization_id: string
          progress?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          framework_type?: Database["public"]["Enums"]["framework_type"]
          id?: string
          organization_id?: string
          progress?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_frameworks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      control_implementation_notes: {
        Row: {
          content: string | null
          control_id: string
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          control_id: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          control_id?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      generated_policies: {
        Row: {
          ai_suggestions: string | null
          created_at: string | null
          created_by: string | null
          framework_type: string
          gaps_analysis: string | null
          id: string
          implementation_guide: string | null
          organization_id: string | null
          policy_content: string
          risk_assessment: string | null
        }
        Insert: {
          ai_suggestions?: string | null
          created_at?: string | null
          created_by?: string | null
          framework_type: string
          gaps_analysis?: string | null
          id?: string
          implementation_guide?: string | null
          organization_id?: string | null
          policy_content: string
          risk_assessment?: string | null
        }
        Update: {
          ai_suggestions?: string | null
          created_at?: string | null
          created_by?: string | null
          framework_type?: string
          gaps_analysis?: string | null
          id?: string
          implementation_guide?: string | null
          organization_id?: string | null
          policy_content?: string
          risk_assessment?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_policies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      implementation_notes: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          last_updated_by: string | null
          organization_id: string | null
          requirement_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          last_updated_by?: string | null
          organization_id?: string | null
          requirement_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          last_updated_by?: string | null
          organization_id?: string | null
          requirement_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "implementation_notes_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "soc2_requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          config: Json
          created_at: string
          enabled: boolean
          id: string
          organization_id: string
          provider: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          organization_id: string
          provider: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          organization_id?: string
          provider?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      iso42001_requirements: {
        Row: {
          control_number: string
          created_at: string | null
          description: string
          id: string
          requirement: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          control_number: string
          created_at?: string | null
          description: string
          id?: string
          requirement?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          control_number?: string
          created_at?: string | null
          description?: string
          id?: string
          requirement?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          slug: string
          subscription_expires_at: string | null
          subscription_status: string
          subscription_tier: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          slug: string
          subscription_expires_at?: string | null
          subscription_status?: string
          subscription_tier?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
          subscription_expires_at?: string | null
          subscription_status?: string
          subscription_tier?: string
          updated_at?: string
        }
        Relationships: []
      }
      policies: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          framework_id: string
          id: string
          organization_id: string
          status: string
          title: string
          updated_at: string
          version: number
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          framework_id: string
          id?: string
          organization_id: string
          status?: string
          title: string
          updated_at?: string
          version?: number
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          framework_id?: string
          id?: string
          organization_id?: string
          status?: string
          title?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "policies_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "compliance_frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          organization_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      soc2_requirements: {
        Row: {
          control_number: string
          created_at: string | null
          description: string
          id: string
          requirement: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          control_number: string
          created_at?: string | null
          description: string
          id?: string
          requirement?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          control_number?: string
          created_at?: string | null
          description?: string
          id?: string
          requirement?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          framework_id: string | null
          id: string
          organization_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          framework_id?: string | null
          id?: string
          organization_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          framework_id?: string | null
          id?: string
          organization_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "compliance_frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_voice_preferences: {
        Row: {
          auto_play: boolean | null
          created_at: string
          id: string
          language: string | null
          playback_speed: number | null
          preferred_voice_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          auto_play?: boolean | null
          created_at?: string
          id?: string
          language?: string | null
          playback_speed?: number | null
          preferred_voice_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          auto_play?: boolean | null
          created_at?: string
          id?: string
          language?: string | null
          playback_speed?: number | null
          preferred_voice_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      voice_summaries: {
        Row: {
          audio_url: string | null
          created_at: string
          duration: number | null
          framework_id: string | null
          id: string
          is_featured: boolean | null
          language: string | null
          organization_id: string | null
          policy_id: string | null
          summary_text: string
          title: string
          updated_at: string
          voice_id: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          duration?: number | null
          framework_id?: string | null
          id?: string
          is_featured?: boolean | null
          language?: string | null
          organization_id?: string | null
          policy_id?: string | null
          summary_text: string
          title: string
          updated_at?: string
          voice_id: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          duration?: number | null
          framework_id?: string | null
          id?: string
          is_featured?: boolean | null
          language?: string | null
          organization_id?: string | null
          policy_id?: string | null
          summary_text?: string
          title?: string
          updated_at?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_summaries_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "compliance_frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voice_summaries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voice_summaries_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_training_sessions: {
        Row: {
          audio_url: string | null
          category: string
          content: string
          created_at: string
          description: string | null
          duration: number | null
          id: string
          is_featured: boolean | null
          language: string | null
          organization_id: string | null
          title: string
          updated_at: string
          voice_id: string
        }
        Insert: {
          audio_url?: string | null
          category: string
          content: string
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          is_featured?: boolean | null
          language?: string | null
          organization_id?: string | null
          title: string
          updated_at?: string
          voice_id: string
        }
        Update: {
          audio_url?: string | null
          category?: string
          content?: string
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          is_featured?: boolean | null
          language?: string | null
          organization_id?: string | null
          title?: string
          updated_at?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_training_sessions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_organization_id: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_super_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      framework_type:
        | "iso27001"
        | "soc2"
        | "gdpr"
        | "hipaa"
        | "pci_dss"
        | "iso42001"
      user_role:
        | "super_admin"
        | "company_admin"
        | "compliance_officer"
        | "employee"
        | "auditor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
