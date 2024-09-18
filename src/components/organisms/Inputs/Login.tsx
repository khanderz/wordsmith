import { Box } from 'native-base'
import { useState } from 'react'

import { Button } from '../../atoms/Button'
import { TextInput } from '../../atoms/TextInput'

interface LoginProps {}

export const Login = ({}: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEmailChange = (text: string) => {
    setEmail(text)
  }

  const onPasswordChange = (text: string) => {
    setPassword(text)
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
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(val) => onEmailChange(val)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(val) => onPasswordChange(val)}
      />
      <Button buttonText="Login" onPress={() => {}} testID="login-button" />
    </Box>
  )
}
