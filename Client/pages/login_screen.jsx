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

  const onRegisterPress = () => {
    // if (password != checkPassword) {
    //   toast.show("Passwords do not match", toast.LONG, toast.TOP);
    //   return;
    // }
    console.warn("Register pressed");
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
        onPress={
          {
            /* Navigate to Register page */
          }
        }
        text="Register"
        type="TERTIARY"
      />
    </View>
  );
};

export default Login_screen;
