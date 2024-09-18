import { Ionicons } from '@expo/vector-icons'
import { Box, View } from 'native-base'
import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { IconButton } from 'react-native-paper'

import { useSnackbar } from '../../../lib/providers/SnackbarProvider'
import { useUser } from '../../../lib/providers/UserProvider'
import { Button } from '../../atoms/Button'
import { TextInput } from '../../atoms/TextInput'

export const Login = () => {
  const { fetchUser, loading, error } = useUser()
  const { showSnackbar } = useSnackbar()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    try {
      await fetchUser()

      showSnackbar('Login successful!', 'Dismiss')
    } catch (err) {
      console.error(err)
      showSnackbar(
        `Login failed: ${error || 'Unknown error'}`,
        'Retry',
        handleLogin,
      )
    }
  }

  if (loading) return <ActivityIndicator />

  return (
    <Box
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Box
        position="relative"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <View style={{ position: 'absolute', right: 20 }}>
          <IconButton
            icon={() => (
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="black"
              />
            )}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
      </Box>
      <Button buttonText="Login" onPress={handleLogin} testID="login-button" />
    </Box>
  )
}
