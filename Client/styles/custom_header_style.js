import { StyleSheet } from "react-native";

const CustomHeaderStyle = StyleSheet.create({
    header: {
        backgroundColor: "#FFCC80",
        width: "100%",
        height: "11%",
        flexDirection: "row",
        flexWrap: "wrap",
        zIndex: 10,
    },
    menu: {
        marginTop: "10%",
        marginLeft: "6%",
        alignItems: "baseline",
        justifyContent: "center"
    },
    bell: {
        marginTop: "4%",
        marginLeft: "78%",
        alignItems: "baseline",
        justifyContent: "center"
    }
});

export default CustomHeaderStyle;