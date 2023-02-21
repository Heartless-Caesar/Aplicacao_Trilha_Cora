import { StyleSheet } from "react-native";

const CustomHeaderStyle = StyleSheet.create({
    header: {
        backgroundColor: "#FFCC80",
        width: "100%",
        height: "11%",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    menu: {
        marginTop: "10%",
        marginLeft: "6%",
        alignItems: "baseline",
        justifyContent: "center"
    },
    bell: {
        marginTop: "5%",
        marginLeft: "78%",
        alignItems: "baseline",
        justifyContent: "center"
    }
});

export default CustomHeaderStyle;