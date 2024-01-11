import { ApolloProvider, gql } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import apolloClient from "./src/clients/apollo";
import { BottomNavigationBar } from "./src/components/BottomNavigationBar";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            {/* <View style={styles.container}>
          <Title>My Vocabulary List</Title>
          <StatusBar style="auto" />
        </View> */}
            <BottomNavigationBar />
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
