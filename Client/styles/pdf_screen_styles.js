import { StyleSheet } from "react-native"

const pdf_styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: "35%",
        backgroundColor: "#F4F4F4",
    },
    pdfContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 3,
        padding: 10,
    },
    pdfTitle: {
        flex: 1,
        fontSize: 16,
    },
    downloadButton: {
        backgroundColor: "#FFCC80",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
    },
    floatingRectangle: {
        position: "absolute",
        top: "10%",
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "#FFCC80",
        borderRadius: 10,
        elevation: 4,
    },
    menuIcon: {
        padding: 10,
    },
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 20,
    },
    menuContent: {
        position: "absolute",
        top: "17%", // Adjust the top position as needed
        right: "77%",
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 4,
        padding: 10,
    },
    menuItem: {
        paddingVertical: 8,
    },
})

export default pdf_styles
