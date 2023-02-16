import { StyleSheet } from "react-native";

const CustomHeaderStyle = StyleSheet.create({
    header: {
        backgroundColor: "#FFCC80",
        width: "100%",
        height: "8%",
        overflow: "hidden",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    menu: {
        marginTop: "6%",
        marginLeft: "6%",
        alignItems: "baseline",
        justifyContent: "center"
    },
    bell: {
        marginTop: "6%",
        marginLeft: "80%",
        alignItems: "baseline",
        justifyContent: "center"
    }
});

export default CustomHeaderStyle;