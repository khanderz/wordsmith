import { Box } from 'native-base'
import { useState } from 'react'

import { useUser } from '../../../lib/providers/UserProvider'
import { Button } from '../../atoms/Button'
import { TextInput } from '../../atoms/TextInput'

export const RegisterScreen = () => {
  const { addUser, loading } = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async () => {
    await addUser(email, password)
  }

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
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button
        buttonText="Register"
        onPress={handleRegister}
        disabled={loading}
      />
    </Box>
  )
}
