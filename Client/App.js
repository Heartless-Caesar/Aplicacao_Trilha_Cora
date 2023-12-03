import { StatusBar } from "expo-status-bar"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import Login_screen from "./pages/login_screen"
import Register_screen from "./pages/register_page"
import Homepage from "./pages/home_page"
import { UserProvider } from "./utils/userPersistence"
import PDFDownloadPage from "./pages/pdf_screen"
import { NetworkProvider } from "react-native-offline"
import React from "react"
import Validation_Check from "./pages/validation_check"
import Cocal from "./pages/info/Cocal"
import Corumba from "./pages/info/Corumba"
import Fran from "./pages/info/Fran"
import Itab from "./pages/info/Itab"
import Ita from "./pages/info/Itaguari"
import Jara from "./pages/info/Jara"
import Pire from "./pages/info/Pire"

import Locals from "./pages/Locals"

export default function App() {
    const Stack = createNativeStackNavigator()

    return (
        <NetworkProvider pingOnlyIfOffline={true}>
            <UserProvider>
                <NavigationContainer>
                    <StatusBar style="auto" />

                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name="Login" component={Login_screen} />
                        <Stack.Screen
                            name="Register"
                            component={Register_screen}
                        />
                        <Stack.Screen
                            name="Validate"
                            component={Validation_Check}
                        />
                        <Stack.Screen name="Locals" component={Locals} />
                        <Stack.Screen name="Home" component={Homepage} />
                        <Stack.Screen name="PDF" component={PDFDownloadPage} />
                        <Stack.Screen name="Cocal" component={Cocal} />
                        <Stack.Screen name="Corumba" component={Corumba} />
                        <Stack.Screen name="Fran" component={Fran} />
                        <Stack.Screen name="Itab" component={Itab} />
                        <Stack.Screen name="Ita" component={Ita} />
                        <Stack.Screen name="Jara" component={Jara} />
                        <Stack.Screen name="Pire" component={Pire} />
                    </Stack.Navigator>
                </NavigationContainer>
            </UserProvider>
        </NetworkProvider>
    )
}
