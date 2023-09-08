import { View, Image, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import loginStyle from "../styles/login_style";
import Logo from "../assets/caminho-de-cora-black.png";
import CustomInput from "../components/customInput";
import CustomButton from "../components/custom_button";
import axios from "axios";
import { Config } from "react-native-dotenv";

// TODO Finish login screen
const Login_screen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();

  const onSignInPress = async () => {
    try {
      const response = await axios({
        url: "http://192.168.1.13:5000/Login",
        method: "POST",
        data: {
          username: username,
          password: password,
        },
      });

      // Assuming the server returns a JWT token upon successful login
      const { token } = response.data;

      // Verify and decode the JWT token
      const decodedToken = jwt.verify(token, Config.JWT_SECRET);

      // Access user data from the decoded token
      const { id, username } = decodedToken;

      console.log("User ID:", id);
      console.log("Username:", username);

      // Redirect to the Home screen
      navigation.replace("Home");
    } catch (error) {
      console.log(error);
    }
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
