import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login_screen from "./pages/login_screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Register_screen from "./pages/register_page";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={<Login_screen />} />
        <Stack.Screen name="Register" component={<Register_screen />} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
