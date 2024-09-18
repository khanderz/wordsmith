import { Box } from 'native-base'
import { useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { useUser } from '../../../lib/providers/UserProvider'
import { Button } from '../../atoms/Button'
import { TextInput } from '../../atoms/TextInput'

export const Login = () => {
  const { fetchUser, loading } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    await fetchUser()
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
