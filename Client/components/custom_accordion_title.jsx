import custom_accordion_title_styles from "../styles/custom_accordion_title_style";
import { View, Text } from "react-native";
import React from "react";

const CustomTitle = ({ date, start_local, finish_local }) => {
  return (
    <View>
      <Text>
        Dia {date} - Início {start_local} - Destino {finish_local}
      </Text>
    </View>
  );
};

export default CustomTitle;
