export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      definitions: {
        Row: {
          definition: string | null
          definition_antonyms: string[] | null
          definition_id: number
          definition_synonyms: string[] | null
        }
        Insert: {
          definition?: string | null
          definition_antonyms?: string[] | null
          definition_id?: number
          definition_synonyms?: string[] | null
        }
        Update: {
          definition?: string | null
          definition_antonyms?: string[] | null
          definition_id?: number
          definition_synonyms?: string[] | null
        }
        Relationships: []
      }
      meanings: {
        Row: {
          meanings_antonyms: string[] | null
          meanings_definitions: unknown[] | null
          meanings_id: number
          meanings_partofspeech: string | null
          meanings_synonyms: string[] | null
        }
        Insert: {
          meanings_antonyms?: string[] | null
          meanings_definitions?: unknown[] | null
          meanings_id?: number
          meanings_partofspeech?: string | null
          meanings_synonyms?: string[] | null
        }
        Update: {
          meanings_antonyms?: string[] | null
          meanings_definitions?: unknown[] | null
          meanings_id?: number
          meanings_partofspeech?: string | null
          meanings_synonyms?: string[] | null
        }
        Relationships: []
      }
      phonetics: {
        Row: {
          phonetics_id: number
          phonetics_license: string[] | null
          phonetics_source_url: string | null
          phonetics_text: string | null
        }
        Insert: {
          phonetics_id?: number
          phonetics_license?: string[] | null
          phonetics_source_url?: string | null
          phonetics_text?: string | null
        }
        Update: {
          phonetics_id?: number
          phonetics_license?: string[] | null
          phonetics_source_url?: string | null
          phonetics_text?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          user_email: string | null
          user_favorite_words: unknown[] | null
          user_id: number
          user_name: string | null
          user_password: string | null
          user_wordlist: unknown[] | null
        }
        Insert: {
          user_email?: string | null
          user_favorite_words?: unknown[] | null
          user_id?: number
          user_name?: string | null
          user_password?: string | null
          user_wordlist?: unknown[] | null
        }
        Update: {
          user_email?: string | null
          user_favorite_words?: unknown[] | null
          user_id?: number
          user_name?: string | null
          user_password?: string | null
          user_wordlist?: unknown[] | null
        }
        Relationships: []
      }
      word: {
        Row: {
          word_definitions: unknown[] | null
          word_id: number
          word_license: string[] | null
          word_meanings: unknown[] | null
          word_name: string | null
          word_phonetic: string | null
          word_phonetics: unknown[] | null
          word_source_urls: string[] | null
        }
        Insert: {
          word_definitions?: unknown[] | null
          word_id?: number
          word_license?: string[] | null
          word_meanings?: unknown[] | null
          word_name?: string | null
          word_phonetic?: string | null
          word_phonetics?: unknown[] | null
          word_source_urls?: string[] | null
        }
        Update: {
          word_definitions?: unknown[] | null
          word_id?: number
          word_license?: string[] | null
          word_meanings?: unknown[] | null
          word_name?: string | null
          word_phonetic?: string | null
          word_phonetics?: unknown[] | null
          word_source_urls?: string[] | null
        }
        Relationships: []
      }
      wordlist: {
        Row: {
          wordlist_id: number
          wordlist_name: string | null
          wordlist_words: unknown[] | null
        }
        Insert: {
          wordlist_id?: number
          wordlist_name?: string | null
          wordlist_words?: unknown[] | null
        }
        Update: {
          wordlist_id?: number
          wordlist_name?: string | null
          wordlist_words?: unknown[] | null
        }
        Relationships: []
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
