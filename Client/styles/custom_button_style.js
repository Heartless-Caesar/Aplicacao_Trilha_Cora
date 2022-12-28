import { StyleSheet } from "react-native";

const button_style = StyleSheet.create({
  container: {
    width: 400,
    maxWidth: 400,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  container_PRIMARY: {
    backgroundColor: "#FFCC80",
  },
  container_TERTIARY: {
    backgroundColor: "#FFCC80",
  },
});

export default button_style;
