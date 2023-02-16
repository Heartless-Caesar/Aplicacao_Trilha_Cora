import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import HomeStyles from "../styles/home_page_styles";
import CustomButton from "../components/custom_button";
import CustomHeader from "../components/custom_header";
import CustomMap from "../components/custom_map";
import { MaterialCommunityIcons } from "react-native-vector-icons"

const Homepage = () => {

  return (
    <View style={HomeStyles.container}  >
      <CustomHeader />
      <CustomMap />
      <View style={HomeStyles.footer}>
        <CustomButton text={<MaterialCommunityIcons name="run" size={24} color="white" />}/>
      </View>
    </View>
  );
};

export default Homepage;
