import {
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import loginStyle from "../styles/login_style";

// TODO Finish login screen
const Login_screen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return <View style={loginStyle.container}></View>;
};

{
  /* <ImageBackground
        source={{ uri: "../assets/background-img.jpg" }}
        resizeMode="cover"
        style={loginStyle.image}
      >
        <View style={loginStyle.input}>
          <TextInput
            style={loginStyle.textInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </View>
        <View style={loginStyle.input}>
          <TextInput
            style={loginStyle.textInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <Pressable style={loginStyle.loginBtn}>
          <Text>Login</Text>
        </Pressable>
      </ImageBackground> */
}

export default Login_screen;
