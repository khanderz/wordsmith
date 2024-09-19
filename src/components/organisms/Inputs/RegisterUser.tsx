import { Ionicons } from '@expo/vector-icons'
import { Box, View } from 'native-base'
import { useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'

import { useSnackbar } from '../../../lib/providers/SnackbarProvider'
import { useUser } from '../../../lib/providers/UserProvider'
import { Button } from '../../atoms/Button'
import { TextInput } from '../../atoms/TextInput'

export const RegisterScreen = ({ setIsRegistering }) => {
  const { addUser, loading, registrationError } = useUser()
  const { showSnackbar } = useSnackbar()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registrationAttempted, setRegistrationAttempted] = useState(false)

  const handleRegister = async () => {
    setRegistrationAttempted(true)

    if (!email || !password || !confirmPassword) {
      showSnackbar('Please fill out all fields', 'Dismiss')
      return
    }

    if (password !== confirmPassword) {
      showSnackbar('Passwords do not match', 'Dismiss')
      return
    }

    await addUser(email, password)
  }

  useEffect(() => {
    console.log('Inside useEffect', {
      registrationError,
      loading,
    })
    console.log('Registration attempted:', registrationAttempted)
    if (registrationAttempted) {
      showSnackbar('Testing Snackbar', 'Dismiss')

      if (registrationError) {
        showSnackbar(`Registration failed: ${registrationError}`, 'Dismiss')
      } else if (!loading && !registrationError) {
        showSnackbar('Registration successful!', 'Dismiss')
        setIsRegistering(false)
      }
    }
  }, [
    registrationError,
    loading,
    showSnackbar,
    setIsRegistering,
    registrationAttempted,
  ])
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
