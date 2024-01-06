import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Title} from 'react-native-paper';
import { BottomNavigationBar } from './src/components/BottomNavigationBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { createClient } from "@supabase/supabase-js";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export default function App() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});


  // useEffect(() => {
  //   getCountries();
  // }, []);

  // async function getCountries() {
  //   const { data } = await supabase.from("countries").select();
  //   setCountries(data);
  // }

  return (
    <ApolloProvider client={client}>
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
      </ApolloProvider>
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

