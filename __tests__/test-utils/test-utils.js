import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import apolloClient from '../../src/clients/apollo'
import { BottomNavigationBar } from '../../src/components/Navigation/BottomNavigationBar'
import { SupabaseProvider } from '../../src/providers/supabaseProvider'

const AllProviders = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <SupabaseProvider>
          <GestureHandlerRootView>
            <NativeBaseProvider>
              <NavigationContainer>
                <BottomNavigationBar>{children}</BottomNavigationBar>
              </NavigationContainer>
            </NativeBaseProvider>
          </GestureHandlerRootView>
        </SupabaseProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }
