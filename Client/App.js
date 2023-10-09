import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login_screen from "./pages/login_screen";
import Register_screen from "./pages/register_page";
import Homepage from "./pages/home_page";
import { UserProvider } from "./utils/userPersistence";
import PDFDownloadPage from "./pages/pdf_screen";
import { NetworkProvider } from "react-native-offline";
import React, { useEffect } from "react";
import { View } from "react-native";
import {
  registerBackgroundTask,
  startBackgroundTask,
  BACKGROUND_TASK_NAME,
} from "./utils/BackgroundTasks";
import TaskManager from "expo-task-manager";

export default function App() {
  useEffect(() => {
    registerBackgroundTask();

    // Start the background task
    startBackgroundTask();

    // Unregister the background task when the component unmounts
    return () => {
      TaskManager.isTaskDefined(BACKGROUND_TASK_NAME).then((defined) => {
        if (defined) {
          TaskManager.unregisterTaskAsync(BACKGROUND_TASK_NAME);
        }
      });
    };
  }, []);
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
