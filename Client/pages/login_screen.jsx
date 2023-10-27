/* eslint-disable react/prop-types */
import { View, Image, useWindowDimensions } from "react-native"
import React, { useState } from "react"
import loginStyle from "../styles/login_style"
import Logo from "../assets/caminho-de-cora-black.png"
import CustomInput from "../components/customInput"
import CustomButton from "../components/custom_button"
import axios from "axios"
import { useUserContext } from "../utils/userPersistence"

// TODO Finish login screen
const Login_screen = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { height } = useWindowDimensions()
    const { setUserData, setUserLocals } = useUserContext()

    const fetchAllLocals = async (userId) => {
        try {
            const response = await axios.get(
                `http://${process.env.BASE_URL}/fetch`,
                {
                    userId: userId,
                }
            )
            //Update the array of locals in the context
            setUserLocals(response.data.Locals.allLocals)
            // ... (rest of the code)
        } catch (error) {
            console.error("Error fetching locals:", error)
        }
    }

    const onSignInPress = async () => {
        try {
            const response = await axios({
                url: `http://${process.env.BASE_URL}/Login`,
                method: "POST",
                data: {
                    username: username,
                    password: password,
                },
            })

            const userData = response.data

            //fetchAllLocals(userData.id);
            console.log(userData)
            setUserData(userData)

            // console.log(userData.token);

            // axios.defaults.headers.common[
            //   "Authorization"
            // ] = `Bearer ${userData.token}`;

            // await SecureStore.setItemAsync(TOKEN_KEY, userData.token);

            // Redirect to the Home screen
            navigation.replace("Home")
        } catch (error) {
            console.log("Teste")
            console.log(error)
        }
    }

    const onRegisterPress = () => {
        navigation.replace("Register")
    }

    // eslint-disable-next-line no-unused-vars
    // const logout = async () => {
    //   await SecureStore.deleteItemAsync(TOKEN_KEY);

    //   axios.defaults.headers.common["Authorization"] = "";

    //   setUserData({ Message: "", token: null });
    // };

    return (
        <View style={loginStyle.container}>
            <Image
                source={Logo}
                style={[loginStyle.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />

            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername}
            />
            <CustomInput
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                setValue={setPassword}
            />
            <CustomButton onPress={() => onSignInPress()} text="Sign In" />
            <CustomButton
                onPress={onRegisterPress}
                text="Cadastre-se"
                type="TERTIARY"
            />
        </View>
    )
}

export default Login_screen
