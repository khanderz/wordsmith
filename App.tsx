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
    // @ts-ignore
    // eslint-disable-next-line react/jsx-curly-brace-presence, prettier/prettier
    <ApolloProvider client={apolloClient} testID={"apollo-provider"}>
      <SafeAreaProvider testID="safe-area-provider">
        {/* @ts-ignore */}
        <SupabaseProvider testID="supabase-provider">
          <GestureHandlerRootView
            style={{ flex: 1 }}
            testID="gesture-handler-root-view"
          >
            {/* @ts-ignore */}

            <NativeBaseProvider testID="native-base-provider">
              {/* @ts-ignore */}

              <NavigationContainer testID="navigation-container">
                {/* @ts-ignore */}

                <BottomNavigationBar testID="bottom-navigation-bar" />
              </NavigationContainer>
            </NativeBaseProvider>
          </GestureHandlerRootView>
        </SupabaseProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
