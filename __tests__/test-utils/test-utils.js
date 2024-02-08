import { MockedProvider } from '@apollo/client/testing'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import * as React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import SupaBaseClientMock from './supabaseClientMock'
import { BottomNavigationBar } from '../../src/components/Navigation/BottomNavigationBar'

const SuperBaseProvider = ({ children }) => {
  return <SupaBaseClientMock>{children}</SupaBaseClientMock>
}

const AllProviders = ({ children }) => {
  return (
    <MockedProvider data-testid="apollo-provider">
      <SafeAreaProvider>
        <SuperBaseProvider>
          <GestureHandlerRootView>
            <NativeBaseProvider>
              <NavigationContainer>
                <BottomNavigationBar>{children}</BottomNavigationBar>
              </NavigationContainer>
            </NativeBaseProvider>
          </GestureHandlerRootView>
        </SuperBaseProvider>
      </SafeAreaProvider>
    </MockedProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }
