import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Title} from 'react-native-paper';
import { BottomNavigationBar } from './src/components/BottomNavigationBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';


export default function App() {
  return (
    <SafeAreaProvider>
         <NativeBaseProvider>
      <NavigationContainer>
        {/* <View style={styles.container}>
          <Title>My Vocabulary List</Title>
          <StatusBar style="auto" />
        </View> */}
        <BottomNavigationBar/>
      </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

