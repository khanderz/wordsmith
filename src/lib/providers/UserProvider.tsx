import { Session } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { supabase } from './SupabaseProvider'
import { WordList, Definition } from '../../types'

interface User {
  user_id: number
  user_name: string
  user_email: string
  user_wordlist: WordList[]
  user_favorite_words: Definition[]
}

interface UserContextProps {
  user: User | null
  loading: boolean
  error: string | null
  fetchUser: () => Promise<void>
}

interface UserProviderProps {
  children: React.ReactNode
  testID: string
}

const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
  error: null,
  fetchUser: async () => {},
})

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Function to fetch the user data from Supabase
  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)

      // Assuming the user is authenticated and you have the session
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession()

      if (sessionError || !sessionData?.session) {
        setError('No active session or failed to get session')
        setLoading(false)
        return
      }

      const userId = sessionData.session.user.id

      // Fetch user data from Supabase
      const { data, error } = await supabase
        .from('user')
        .select(
          'user_id, user_name, user_email, user_wordlist, user_favorite_words',
        )
        .eq('user_id', userId)

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      if (data && data.length > 0) {
        setUser(data[0]) // Set the fetched user data
      } else {
        setError('User not found')
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError('Failed to fetch user data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Fetch user when the component mounts
    fetchUser()
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      fetchUser,
    }),
    [user, loading, error],
  )
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
