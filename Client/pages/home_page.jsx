import { SafeAreaView, View } from "react-native";
import React, { useState } from "react";
import HomeStyles from "../styles/home_page_styles";
import CustomButton from "../components/custom_button";
import CustomHeader from "../components/custom_header";
import CustomMap from "../components/custom_map";
import CustomModal from "../components/custom_modal";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import MapScreen from "../components/map_component";

const Homepage = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <MapScreen />
    </>
  );
};

export default Homepage;
