import { ApolloProvider, gql } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { HoldMenuProvider } from 'react-native-hold-menu'
import { Title } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-url-polyfill/auto'

import apolloClient from './src/clients/apollo'
import { BottomNavigationBar } from './src/components/Naigation/BottomNavigationBar'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {/* <HoldMenuProvider theme="light" style={{ flex: 1 }}> */}
            <NavigationContainer>
              {/* <View style={styles.container}>
          <Title>My Vocabulary List</Title>
          <StatusBar style="auto" />
        </View> */}
              <BottomNavigationBar />
            </NavigationContainer>
            {/* </HoldMenuProvider> */}
          </GestureHandlerRootView>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })
