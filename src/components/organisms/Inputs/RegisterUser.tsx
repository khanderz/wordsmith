import React, { useState } from 'react'
import { Button, TextInput, View, Text } from 'react-native'

import { useUser } from '../../../lib/providers/UserProvider'

export const RegisterScreen = () => {
  const { addUser, loading, error } = useUser()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    await addUser(name, email, password)
  }

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} disabled={loading} />
      {error && <Text>{error}</Text>}
    </View>
  )
}
