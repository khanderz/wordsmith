import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import 'react-native-url-polyfill/auto'
import apolloClient from './src/clients/apollo'
import { BottomNavigationBar } from './src/components/Navigation/BottomNavigationBar'
import { SupabaseProvider } from './src/providers/supabaseProvider'

export default function App() {
  return (
    <ApolloProvider client={apolloClient} data-testid="apollo-provider">
      <SafeAreaProvider data-testid="safe-area-provider">
        <SupabaseProvider data-testid="supabase-provider">
          <GestureHandlerRootView
            style={{ flex: 1 }}
            data-testid="gesture-handler-root-view"
          >
            <NativeBaseProvider data-testid="native-base-provider">
              <NavigationContainer data-testid="navigation-container">
                <BottomNavigationBar data-testid="bottom-navigation-bar" />
              </NavigationContainer>
            </NativeBaseProvider>
          </GestureHandlerRootView>
        </SupabaseProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
