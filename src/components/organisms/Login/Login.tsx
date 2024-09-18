import { Box } from 'native-base'

import { Button } from '../../atoms/Button'
import { TextInput } from '../../atoms/TextInput'

interface LoginProps {}

export const Login = ({}: LoginProps) => {
  return (
    <Box
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
      <Button buttonText="Login" onPress={() => {}} testID="login-button" />
    </Box>
  )
}
