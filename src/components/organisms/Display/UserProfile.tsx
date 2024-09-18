import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import { useUser } from '../../../lib/providers/UserProvider'

interface UserProfileProps {}

export const UserProfile = ({}: UserProfileProps) => {
  const { user, loading, error, fetchUser } = useUser()

  if (loading) return <ActivityIndicator />
  if (error) return <Text>Error: {error}</Text>

  return (
    <View>
      <Text>User Name: {user?.user_name}</Text>
      <Text>User Email: {user?.user_email}</Text>
      {/* Render the word list or favorite words */}
    </View>
  )
}
