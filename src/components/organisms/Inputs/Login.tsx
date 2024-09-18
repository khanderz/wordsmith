import { Box } from 'native-base'
import { useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { useSnackbar } from '../../../lib/providers/SnackbarProvider'
import { useUser } from '../../../lib/providers/UserProvider'
import { Button } from '../../atoms/Button'
import { TextInput } from '../../atoms/TextInput'

export const Login = () => {
  const { fetchUser, loading, error } = useUser()
  const { showSnackbar } = useSnackbar()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button buttonText="Login" onPress={handleLogin} testID="login-button" />
    </Box>
  )
}
