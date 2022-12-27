import { StyleSheet } from "react-native";

const button_style = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  container_PRIMARY: {
    backgroundColor: "#FFCC80",
  },
  container_TERTIARY: {},
});

export default button_style;
