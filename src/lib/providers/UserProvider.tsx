import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { supabase } from './SupabaseProvider'
import { WordList, Definition } from '../../types'

export interface User {
  user_id: number
  user_name: string
  user_email: string
  user_password: string
  user_wordlist: WordList[]
  user_favorite_words: Definition[]
}

interface UserContextProps {
  user: User | null
  loading: boolean
  error: string | null
  fetchUser: () => Promise<void>
  addUser: (
    userEmail: User['user_email'],
    password: User['user_password'],
  ) => Promise<void>
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
  addUser: async () => {},
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
          'user_id, user_name, user_email, user_password, user_wordlist, user_favorite_words',
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
    } catch (e) {
      console.error(e)
      setError('Failed to fetch user data')
    } finally {
      setLoading(false)
    }
  }

  const addUser = async (
    userEmail: User['user_email'],
    password: User['user_password'],
  ) => {
    try {
      setLoading(true)
      setError(null)

      // Sign up the user using Supabase auth (optional if you handle auth separately)
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: userEmail,
        password,
      })

      const user = data?.user

      if (signUpError || !user) {
        setError(signUpError ? signUpError.message : 'Failed to sign up')
        setLoading(false)
        return
      }

      // After successful signup, insert user data into the `user` table
      const { error } = await supabase.from('user').insert({
        user_id: user.id, // Use Supabase-generated user ID
        user_name: userEmail,
        user_email: userEmail,
        user_password: password,
        user_wordlist: [], // Initialize with an empty wordlist
        user_favorite_words: [], // Initialize with empty favorite words
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Fetch the user after adding it to the database
      await fetchUser()

      setError(null)
    } catch (e) {
      console.error(e)
      setError('Failed to add user')
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
      addUser,
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
