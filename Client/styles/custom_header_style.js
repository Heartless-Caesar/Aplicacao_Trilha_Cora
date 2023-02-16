import { StyleSheet } from "react-native";

const CustomHeaderStyle = StyleSheet.create({
    header: {
        backgroundColor: "#FFCC80",
        width: "100%",
        height: "10%",
        overflow: "hidden",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    menu: {
        marginTop: "8%",
        marginLeft: "6%",
        alignItems: "baseline",
        justifyContent: "center"
    },
    bell: {
        marginTop: "8%",
        marginLeft: "79%",
        alignItems: "baseline",
        justifyContent: "center"
    }
});

export default CustomHeaderStyle;