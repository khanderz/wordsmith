import { ApolloProvider } from '@apollo/client'
// import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import 'react-native-url-polyfill/auto'
import { BottomBar } from './src/components/organisms/Navigation/BottomNavigationBar'
import { TopBar } from './src/components/organisms/Navigation/TopBar'
import apolloClient from './src/lib/clients/apollo'
import { SnackbarProvider } from './src/lib/providers/SnackbarProvider'
import { SupabaseProvider } from './src/lib/providers/SupabaseProvider'
import { UserProvider } from './src/lib/providers/UserProvider'
import { WordlistProvider } from './src/lib/providers/WordlistProvider'

export default function App() {
  return (
    // @ts-ignore
    // eslint-disable-next-line react/jsx-curly-brace-presence, prettier/prettier
    <ApolloProvider client={apolloClient} testID={"apollo-provider"}>
      <SafeAreaProvider testID="safe-area-provider">
        {/* @ts-ignore */}
        <SupabaseProvider testID="supabase-provider">
          <UserProvider testID="user-provider">
            <GestureHandlerRootView
              style={{ flex: 1 }}
              testID="gesture-handler-root-view"
            >
              {/* @ts-ignore */}

              <NativeBaseProvider testID="native-base-provider">
                <SnackbarProvider testID="snackbar-provider">
                  <WordlistProvider testID="wordlist-provider">
                    <TopBar testID="top-navigation-bar" />
                    <BottomBar testID="bottom-navigation-bar" />
                  </WordlistProvider>
                </SnackbarProvider>
              </NativeBaseProvider>
            </GestureHandlerRootView>
          </UserProvider>
        </SupabaseProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
