import { useState } from 'react'
import { View, ActivityIndicator } from 'react-native'

import { Button } from '../components/atoms/Button'
import { UserProfile } from '../components/organisms/Display/UserProfile'
import { Login } from '../components/organisms/Inputs/Login'
import { RegisterScreen } from '../components/organisms/Inputs/RegisterUser'
import { useUser } from '../lib/providers/UserProvider'

export const AccountScreen = () => {
  const { user, loading } = useUser()
  const [isRegistering, setIsRegistering] = useState(false)

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <UserProfile />
      ) : (
        <>
          {isRegistering ? (
            <>
              <RegisterScreen />
              <Button
                buttonText="Already have an account? Log in"
                onPress={() => setIsRegistering(false)}
                testID="login-button"
              />
            </>
          ) : (
            <>
              <Login />
              <Button
                buttonText="Don't have an account? Register"
                onPress={() => setIsRegistering(true)}
                testID="register-button"
              />
            </>
          )}
        </>
      )}
    </View>
  )
}
