import { View, Image, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import loginStyle from "../styles/login_style";
import Logo from "../assets/caminho-de-cora-black.png";
import CustomInput from "../components/customInput";
import CustomButton from "../components/custom_button";
import axios from "axios";

// TODO Finish login screen
const Login_screen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();

  const onSignInPress = async () => {
    await axios({
      url: "http://localhost:3000/Login",
      method: "POST",
      data: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        console.log(res.data);
        navigation.replace("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRegisterPress = () => {
    navigation.replace("Register");
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
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        setValue={setPassword}
      />
      <CustomButton onPress={onSignInPress} text="Sign In" />
      <CustomButton
        onPress={onRegisterPress}
        text="Cadastre-se"
        type="TERTIARY"
      />
    </View>
  );
};

export default Login_screen;
