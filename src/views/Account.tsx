import { View } from 'react-native'

import { Login } from '../components/organisms/Login/Login'

export const AccountScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Login />
    </View>
  )
}
