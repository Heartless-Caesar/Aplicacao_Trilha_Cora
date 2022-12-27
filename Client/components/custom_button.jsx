import { View, Text, Pressable } from "react-native";
import React from "react";
import button_style from "../styles/custom_button_style";

const CustomButton = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={button_style.container}>
        <Text style={button_style.text}>{props.text}</Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;
