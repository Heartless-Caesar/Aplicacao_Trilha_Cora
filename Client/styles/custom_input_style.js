import { StyleSheet } from "react-native"

const input_style = StyleSheet.create({
    container: {
        width: " 100%",
        backgroundColor: "white",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    input: {
        padding: 10,
    },
    eyeIcon: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -12 }], // Adjust this value for vertical centering
    },
})

export default input_style
