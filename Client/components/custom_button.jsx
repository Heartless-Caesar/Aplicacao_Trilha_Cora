import { View, Text, Pressable } from "react-native";
import React from "react";
import button_style from "../styles/custom_button_style";

const CustomButton = (props, { type = "PRIMARY" }) => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={[button_style.container, styles[`container_${type}`]]}>
        <Text style={[button_style.text, styles[`text_${type}`]]}>
          {props.text}
        </Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;
