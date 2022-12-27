import {
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import loginStyle from "../styles/login_style";
import Logo from "../assets/caminho-de-cora-black.png";
import CustomInput from "../components/customInput";
import CustomButton from "../components/custom_button";

// TODO Finish login screen
const Login_screen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();

  const onSignInPress = () => {
    console.warn("Sign in pressed");
  };

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
        secureTextEntry
      />
      <CustomButton onPress={onSignInPress} text="Sign In" />
    </View>
  );
};

export default Login_screen;
