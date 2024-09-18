import { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import { useSnackbar } from '../../../lib/providers/SnackbarProvider'
import { useUser } from '../../../lib/providers/UserProvider'

export const UserProfile = () => {
  const { user, loading, error, fetchUser } = useUser()
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    if (error) {
      showSnackbar(`Error: ${error}`, 'Retry', () => {
        fetchUser()
      })
    }
  }, [error, showSnackbar, fetchUser])

  if (loading) return <ActivityIndicator />

  return (
    <View>
      <Text>User Name: {user?.user_name}</Text>
      <Text>User Email: {user?.user_email}</Text>
    </View>
  )
}
