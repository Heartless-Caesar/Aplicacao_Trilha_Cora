import { View, Text, TextInput } from "react-native";
import React from "react";
import input_style from "../styles/custom_input_style";

const CustomInput = (props) => {
  return (
    <View style={input_style.container}>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        style={input_style.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.setValue}
      />
    </View>
  );
};

export default CustomInput;
