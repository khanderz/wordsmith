import { render } from './test-utils/test-utils'
import App from '../App'

describe('App component', () => {
  test('renders correctly', () => {
    //@ts-ignore
    const { getByTestId } = render(<App />)

    // Assert that the ApolloProvider is rendered
    // expect(getByTestId('apollo-provider')).toBeTruthy()

    // Assert that the SafeAreaProvider is rendered
    expect(getByTestId('safe-area-provider')).toBeTruthy()

    // Assert that the SupabaseProvider is rendered
    // expect(getByTestId('supabase-provider')).toBeTruthy()

    // Assert that the GestureHandlerRootView is rendered
    expect(getByTestId('gesture-handler-root-view')).toBeTruthy()

    // Assert that the NativeBaseProvider is rendered
    // expect(getByTestId('native-base-provider')).toBeTruthy()

    // Assert that the NavigationContainer is rendered
    // expect(getByTestId('navigation-container')).toBeTruthy()

    // Assert that the BottomNavigationBar is rendered
    expect(getByTestId('bottom-navigation-bar')).toBeTruthy()
  })
})
