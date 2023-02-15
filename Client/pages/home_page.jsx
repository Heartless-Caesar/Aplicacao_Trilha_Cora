import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import HomeStyles from "../styles/home_page_styles";
import CustomHeader from "../components/custom_header";
import CustomFooter from "../components/custom_footer";
import CustomMap from "../components/custom_map";

const Homepage = () => {

  return (
    <View style={HomeStyles.container}  >
      <CustomHeader />
      <CustomMap />
      <CustomFooter />
    </View>
  );
};

export default Homepage;
