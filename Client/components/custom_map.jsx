import { View, Text, Image } from "react-native";
import CustomMapStyle from "../styles/custom_map_style";
import Trail from "../assets/trail.png";

const CustomMap = () => {
  return (
    <View style={CustomMapStyle.container}>
      <Image
        style={CustomMapStyle.image}
        source={Trail} />
    </View>
  );
};

export default CustomMap;
