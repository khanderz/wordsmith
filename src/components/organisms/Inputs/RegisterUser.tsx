import { Ionicons } from '@expo/vector-icons'
import { Box, View } from 'native-base'
import { useState } from 'react'
import { IconButton } from 'react-native-paper'

import { useSnackbar } from '../../../lib/providers/SnackbarProvider'
import { useUser } from '../../../lib/providers/UserProvider'
import { Button } from '../../atoms/Button'
import { TextInput } from '../../atoms/TextInput'

export const RegisterScreen = () => {
  const { addUser, loading } = useUser()
  const { showSnackbar } = useSnackbar()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      showSnackbar('Passwords do not match', 'Dismiss')
      return
    }

    try {
      await addUser(email, password)

      showSnackbar('Registration successful!', 'Dismiss')
    } catch (error) {
      showSnackbar(
        `Registration failed: ${error?.message || 'Unknown error'}`,
        'Retry',
        handleRegister,
      )
    }
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

      <Box
        position="relative"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <View style={{ position: 'absolute', right: 20 }}>
          <IconButton
            icon={() => (
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={24}
                color="black"
              />
            )}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>
      </Box>

      <Button
        buttonText="Register"
        onPress={handleRegister}
        disabled={loading}
      />
    </Box>
  )
}
