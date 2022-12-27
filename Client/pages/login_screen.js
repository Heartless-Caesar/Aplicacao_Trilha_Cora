import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

// TODO Finish login screen
const Login_screen = () => {
  const [username, setUsername] = useState("");
  return (
    <View>
      <Text>Login_screen</Text>
      <TextInput
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </View>
  );
};

export default Login_screen;
