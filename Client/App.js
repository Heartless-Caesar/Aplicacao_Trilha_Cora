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

import CocalScreen from "./pages/info/CocalScreen"
import CalcilandiaScreen from "./pages/info/CalcilandiaScreen"
import CidGoScreen from "./pages/info/CidGoScreen"
import CorumbaScreen from "./pages/info/CorumbaScreen"
import FerreiroScreen from "./pages/info/FerreiroScreen"
import FranScreen from "./pages/info/FranScreen"
import ItaguariScreen from "./pages/info/ItaguariScreen"
import JaraScreen from "./pages/info/JaraScreen"
import PireScreen from "./pages/info/PireScreen"
import RadiolandiaScreen from "./pages/info/RadiolandiaScreen"
import SaoBeneditoScreen from "./pages/info/SaoBeneditoScreen"
import VilaAparecidaScreen from "./pages/info/VilaAparecidaScreen"

export default function App() {
    const Stack = createNativeStackNavigator()

    return (
        <NetworkProvider>
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
                        <Stack.Screen name="Home" component={Homepage} />
                        <Stack.Screen name="PDF" component={PDFDownloadPage} />
                        <Stack.Screen
                            name="Cidade de Goiás"
                            component={CidGoScreen}
                        />
                        <Stack.Screen
                            name="Cocalzinho de Goiás"
                            component={CocalScreen}
                        />
                        <Stack.Screen
                            name="Pirenópolis"
                            component={PireScreen}
                        />
                        <Stack.Screen
                            name="São Francisco de Goiás"
                            component={FranScreen}
                        />
                        <Stack.Screen name="Jaraguá" component={JaraScreen} />
                        <Stack.Screen
                            name="Itaguari"
                            component={ItaguariScreen}
                        />
                        <Stack.Screen
                            name="Corumba"
                            component={CorumbaScreen}
                        />
                        <Stack.Screen
                            name="Ferreiro"
                            component={FerreiroScreen}
                        />
                        <Stack.Screen
                            name="Calcilândia"
                            component={CalcilandiaScreen}
                        />
                        <Stack.Screen
                            name="São Benedito"
                            component={SaoBeneditoScreen}
                        />
                        <Stack.Screen
                            name="Vila Aparecida"
                            component={VilaAparecidaScreen}
                        />
                        <Stack.Screen
                            name="Radiolândia"
                            component={RadiolandiaScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </UserProvider>
        </NetworkProvider>
    )
}
