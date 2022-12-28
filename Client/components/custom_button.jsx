import { View, Text, Pressable } from "react-native";
import React from "react";
import button_style from "../styles/custom_button_style";

const CustomButton = ({ type = "PRIMARY", onPress, text }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[button_style.container, button_style[`container_${type}`]]}>
        <Text style={[button_style.text, button_style[`text_${type}`]]}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;
