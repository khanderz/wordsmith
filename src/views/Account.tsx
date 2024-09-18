import { View } from 'react-native'

import { UserProfile } from '../components/organisms/Display/UserProfile'
import { Login } from '../components/organisms/Inputs/Login'

export const AccountScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Login />
      <UserProfile />
    </View>
  )
}
