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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      garden: {
        Row: {
          created_at: string
          id: number
          sentences: Json[] | null
          user_id: string
          year_month: string
        }
        Insert: {
          created_at?: string
          id?: number
          sentences?: Json[] | null
          user_id: string
          year_month: string
        }
        Update: {
          created_at?: string
          id?: number
          sentences?: Json[] | null
          user_id?: string
          year_month?: string
        }
        Relationships: []
      }
      sentence: {
        Row: {
          avatar_url: string | null
          comment: Json[] | null
          content: string
          created_at: string
          email: string | null
          emotion_level: string
          favorite: number | null
          favorited_user_id: string[] | null
          id: number
          user_id: string
          user_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          comment?: Json[] | null
          content: string
          created_at?: string
          email?: string | null
          emotion_level: string
          favorite?: number | null
          favorited_user_id?: string[] | null
          id?: number
          user_id: string
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          comment?: Json[] | null
          content?: string
          created_at?: string
          email?: string | null
          emotion_level?: string
          favorite?: number | null
          favorited_user_id?: string[] | null
          id?: number
          user_id?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sentence_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_info: {
        Row: {
          about_me: string | null
          avatar_url: string | null
          created_at: string
          email: string | null
          favorite_sentence: Json[] | null
          favorite_words: string[] | null
          id: string
          user_name: string | null
        }
        Insert: {
          about_me?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          favorite_sentence?: Json[] | null
          favorite_words?: string[] | null
          id: string
          user_name?: string | null
        }
        Update: {
          about_me?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          favorite_sentence?: Json[] | null
          favorite_words?: string[] | null
          id?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_info_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_words: {
        Row: {
          created_at: string
          id: number
          user_id: string
          words: Json[] | null
        }
        Insert: {
          created_at?: string
          id?: number
          user_id: string
          words?: Json[] | null
        }
        Update: {
          created_at?: string
          id?: number
          user_id?: string
          words?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "user_words_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      word_dictionary: {
        Row: {
          count: number
          created_at: string
          id: number
          word: string
        }
        Insert: {
          count: number
          created_at?: string
          id?: number
          word: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: number
          word?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_favorite: {
        Args: {
          sentence_id: number
          user_uuid: string
        }
        Returns: undefined
      }
      increment_favorite: {
        Args: {
          sentence_id: number
          user_uuid: string
        }
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
