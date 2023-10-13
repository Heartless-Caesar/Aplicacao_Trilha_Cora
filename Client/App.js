import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login_screen from "./pages/login_screen";
import Register_screen from "./pages/register_page";
import Homepage from "./pages/home_page";
import { UserProvider } from "./utils/userPersistence";
import PDFDownloadPage from "./pages/pdf_screen";
import { NetworkProvider } from "react-native-offline";
import React from "react";
import { View } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <View>
      <NetworkProvider>
        <UserProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Login" component={Login_screen} />
              <Stack.Screen name="Register" component={Register_screen} />
              <Stack.Screen name="Home" component={Homepage} />
              <Stack.Screen name="PDF" component={PDFDownloadPage} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </NetworkProvider>
    </View>
  );
}
