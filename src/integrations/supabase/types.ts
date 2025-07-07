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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bookmarked_questions: {
        Row: {
          bookmarked_at: string
          id: string
          question_data: Json
          question_id: number
          topic_id: string
          user_id: string
        }
        Insert: {
          bookmarked_at?: string
          id?: string
          question_data: Json
          question_id: number
          topic_id: string
          user_id: string
        }
        Update: {
          bookmarked_at?: string
          id?: string
          question_data?: Json
          question_id?: number
          topic_id?: string
          user_id?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          id: string
          issued_at: string
          score: number
          topic_id: string
          total: number
          user_id: string
        }
        Insert: {
          id?: string
          issued_at: string
          score: number
          topic_id: string
          total: number
          user_id?: string
        }
        Update: {
          id?: string
          issued_at?: string
          score?: number
          topic_id?: string
          total?: number
          user_id?: string
        }
        Relationships: []
      }
      leaderboard_stats: {
        Row: {
          certificates_count: number
          current_streak: number
          last_updated: string
          max_streak: number
          total_quizzes: number
          total_score: number
          user_id: string
        }
        Insert: {
          certificates_count?: number
          current_streak?: number
          last_updated?: string
          max_streak?: number
          total_quizzes?: number
          total_score?: number
          user_id: string
        }
        Update: {
          certificates_count?: number
          current_streak?: number
          last_updated?: string
          max_streak?: number
          total_quizzes?: number
          total_score?: number
          user_id?: string
        }
        Relationships: []
      }
      lifeline_usage: {
        Row: {
          id: string
          lifeline_type: string
          question_id: number
          quiz_session_id: string
          used_at: string
          user_id: string
        }
        Insert: {
          id?: string
          lifeline_type: string
          question_id: number
          quiz_session_id: string
          used_at?: string
          user_id: string
        }
        Update: {
          id?: string
          lifeline_type?: string
          question_id?: number
          quiz_session_id?: string
          used_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string
          created_at: string
          email: string
          email_confirmed_at: string
          full_name: string
          id: string
          is_premium: boolean
          notification_preferences: Json
          onboarding_completed: boolean
          preferred_language: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          email: string
          email_confirmed_at: string
          full_name: string
          id: string
          is_premium?: boolean
          notification_preferences?: Json
          onboarding_completed?: boolean
          preferred_language?: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          email?: string
          email_confirmed_at?: string
          full_name?: string
          id?: string
          is_premium?: boolean
          notification_preferences?: Json
          onboarding_completed?: boolean
          preferred_language?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      question_reports: {
        Row: {
          id: string
          message: string
          question_id: number
          reported_at: string
          status: string
          topic_id: string
          user_id: string
        }
        Insert: {
          id?: string
          message: string
          question_id: number
          reported_at?: string
          status?: string
          topic_id: string
          user_id: string
        }
        Update: {
          id?: string
          message?: string
          question_id?: number
          reported_at?: string
          status?: string
          topic_id?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          completed_at: string
          id: string
          score: number
          streak_day: string
          topic_id: string
          total_questions: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          score: number
          streak_day?: string
          topic_id: string
          total_questions: number
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          score?: number
          streak_day?: string
          topic_id?: string
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      quiz_progress: {
        Row: {
          answers: Json | null
          current_question: number | null
          id: string
          topic_id: string
          user_id: string | null
        }
        Insert: {
          answers?: Json | null
          current_question?: number | null
          id?: string
          topic_id: string
          user_id?: string | null
        }
        Update: {
          answers?: Json | null
          current_question?: number | null
          id?: string
          topic_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          created_at: string
          id: string
          score: number
          topic_id: string
          total: number
          user_id: string
        }
        Insert: {
          created_at: string
          id?: string
          score: number
          topic_id: string
          total: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          score?: number
          topic_id?: string
          total?: number
          user_id?: string
        }
        Relationships: []
      }
      quiz_sessions: {
        Row: {
          created_at: string
          end_time: string | null
          id: string
          quiz_id: string
          score: number | null
          start_time: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          id?: string
          quiz_id: string
          score?: number | null
          start_time?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_time?: string | null
          id?: string
          quiz_id?: string
          score?: number | null
          start_time?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          score: number
          streak: number
        }
        Insert: {
          created_at: string
          email: string
          id?: string
          score: number
          streak: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          score?: number
          streak?: number
        }
        Relationships: []
      }
      wrong_answers: {
        Row: {
          answered_on: string
          id: string
          question_data: Json
          question_id: number
          topic_id: string
          user_id: string
        }
        Insert: {
          answered_on?: string
          id?: string
          question_data: Json
          question_id: number
          topic_id: string
          user_id: string
        }
        Update: {
          answered_on?: string
          id?: string
          question_data?: Json
          question_id?: number
          topic_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_rank: {
        Args: { user_id: string }
        Returns: number
      }
      get_user_streak: {
        Args: { user_uuid: string }
        Returns: number
      }
      update_leaderboard_stats: {
        Args: { target_user_id: string }
        Returns: undefined
      }
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
