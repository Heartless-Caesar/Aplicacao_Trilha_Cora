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
import toast from "react-native-simple-toast";

const Register_screen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { height } = useWindowDimensions();

  const onRegisterPress = () => {
    if (password != checkPassword) {
      toast.show("Passwords do not match", toast.LONG, toast.TOP);
      return;
    }
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
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomInput
        placeholder="Confirm password"
        value={checkPassword}
        setValue={setCheckPassword}
        secureTextEntry={true}
      />

      <CustomButton onPress={onRegisterPress} text="Register" />
    </View>
  );
};

export default Login_screen;
