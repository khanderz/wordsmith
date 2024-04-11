import { SupabaseClient, createClient } from '@supabase/supabase-js'
import React from 'react'
import { Provider } from 'react-supabase'

// import 'react-native-url-polyfill/auto';
import { Database } from '../../supabase/database.types'
import { Definition, WordList } from '../types'

export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
export const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY

//@ts-ignore
export const supabase: SupabaseClient = createClient<Database>(
  //@ts-ignore
  supabaseUrl,
  supabaseKey,
)

interface SupabaseProviderProps {
  children: React.ReactNode
}

export const SupabaseProvider = (props: SupabaseProviderProps) => {
  return <Provider value={supabase}>{props.children}</Provider>
}

interface SupabaseContextProps {
  wordlist: WordList[]
}

export const SupabaseContext = React.createContext<SupabaseContextProps>({
  wordlist: [] as WordList[],
})

export const useSupabaseContext = () => {
  const context = React.useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabaseContext must be used within a SupabaseProvider')
  }
  return context
}
