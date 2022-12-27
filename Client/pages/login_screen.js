import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import loginStyle from "../styles/login_style";

// TODO Finish login screen
const Login_screen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={loginStyle.container}>
      <View style={loginStyle.credentials_container}>
        <Text>Login_screen</Text>
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </View>
    </View>
  );
};

export default Login_screen;
