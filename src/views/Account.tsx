import { View, ActivityIndicator } from 'react-native'

import { UserProfile } from '../components/organisms/Display/UserProfile'
import { Login } from '../components/organisms/Inputs/Login'
import { useUser } from '../lib/providers/UserProvider'

export const AccountScreen = () => {
  const { user, loading } = useUser()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? <UserProfile /> : <Login />}
    </View>
  )
}
