import { ApolloProvider, gql } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
// import { StatusBar } from 'expo-status-bar'
import * as Sharing from 'expo-sharing'
import { NativeBaseProvider } from 'native-base'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Title } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import 'react-native-url-polyfill/auto'
import apolloClient from './src/clients/apollo'
import { BottomNavigationBar } from './src/components/Navigation/BottomNavigationBar'
import { SupabaseProvider } from './src/providers/supabaseProvider'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <SupabaseProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NativeBaseProvider>
              <NavigationContainer>
                {/* <View style={styles.container}>
          <Title>My Vocabulary List</Title>
          <StatusBar style="auto" />
        </View> */}

                {/* <StatusBar style="auto" /> */}
                <BottomNavigationBar />
              </NavigationContainer>
              {/* </HoldMenuProvider> */}
            </NativeBaseProvider>
          </GestureHandlerRootView>
        </SupabaseProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  gap: {
    marginBottom: 20,
  },
})
