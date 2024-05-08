import { MockedProvider } from '@apollo/client/testing'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { BottomNavigationBar } from '../../src/components/Navigation/BottomNavigationBar'

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const mocks = []
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  }
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <SafeAreaProvider>
          {/* <SuperBaseProvider> */}
          <GestureHandlerRootView>
            <NavigationContainer>
              {/* <BottomNavigationBar> */}
              {children}
              {/* </BottomNavigationBar> */}
            </NavigationContainer>
          </GestureHandlerRootView>
          {/* </SuperBaseProvider> */}
        </SafeAreaProvider>
      </MockedProvider>
    </NativeBaseProvider>
  )
}
