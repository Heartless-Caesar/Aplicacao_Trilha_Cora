/* eslint-disable react/prop-types */
import {
    View,
    Image,
    useWindowDimensions,
    TouchableOpacity,
    Text,
} from "react-native"
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
    const [showPassword, setShowPassword] = useState(false)

    const { setUserData, setUserLocals } = useUserContext()

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
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
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={!showPassword}
                togglePasswordVisibility={togglePasswordVisibility} // Pass the toggle function
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
