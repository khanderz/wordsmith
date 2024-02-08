import { SupabaseClient, createClient } from '@supabase/supabase-js'

// import 'react-native-url-polyfill/auto';
import { Database } from '../../supabase/database.types'

export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string
export const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY as string

export const supabase: SupabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseKey,
)
