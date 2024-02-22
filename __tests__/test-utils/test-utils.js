import { MockedProvider } from '@apollo/client/testing'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import * as React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { SupaBaseClientMock } from './supabaseClientMock'
import { BottomNavigationBar } from '../../src/components/Navigation/BottomNavigationBar'
import '@testing-library/jest-dom'
jest.useFakeTimers()

// const SuperBaseProvider = ({ children }) => {
//   return <SupaBaseClientMock>{children}</SupaBaseClientMock>
// }

const AllProviders = ({ children }) => {
  const mocks = []
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  }
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        // eslint-disable-next-line react/jsx-curly-brace-presence, prettier/prettier
      testID="apollo-provider"
      >
        <SafeAreaProvider>
          {/* <SuperBaseProvider> */}
          <GestureHandlerRootView>
            <NavigationContainer>
              <BottomNavigationBar>{children}</BottomNavigationBar>
            </NavigationContainer>
          </GestureHandlerRootView>
          {/* </SuperBaseProvider> */}
        </SafeAreaProvider>
      </MockedProvider>
    </NativeBaseProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }
