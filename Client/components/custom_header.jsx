import { View } from "react-native";
import CustomHeaderStyle from "../styles/custom_header_style";
import { MaterialCommunityIcons } from "react-native-vector-icons"
import CustomMenu from "./custom_menu";

const CustomHeader = () => {
    return (
        <View style={CustomHeaderStyle.header}>
            <View style={CustomHeaderStyle.menu}>
                <CustomMenu />
            </View>
            <View style={CustomHeaderStyle.bell}>
                <MaterialCommunityIcons name="bell" size={24} color="white" />
            </View>
        </View>
    );
};

export default CustomHeader;
