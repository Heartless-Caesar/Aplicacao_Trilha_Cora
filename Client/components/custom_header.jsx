import { View, SafeAreaView } from "react-native";
import CustomHeaderStyle from "../styles/custom_header_style";
import { Feather, MaterialCommunityIcons } from "react-native-vector-icons"

const CustomHeader = () => {
    return (
        <View style={CustomHeaderStyle.header}>
            <View style={CustomHeaderStyle.menu}>
                <Feather name="menu" size={20} color="white" />
            </View>
            <View style={CustomHeaderStyle.bell}>
                <MaterialCommunityIcons name="bell" size={20} color="white" />
            </View>
        </View>
    );
};

export default CustomHeader;
