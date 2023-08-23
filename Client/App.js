import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login_screen from "./pages/login_screen";
import Register_screen from "./pages/register_page";
import Homepage from "./pages/home_page";
import PDFDownloadPage from "./pages/pdf_screen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login_screen} />
        <Stack.Screen name="Register" component={Register_screen} />
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="pdf" component={PDFDownloadPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
