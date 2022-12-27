import { StyleSheet } from "react-native";

const login = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  input: {
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#FFF3E0",
  },
  textInput: {
    justifyContent: "center",
    height: 50,
    flex: 1,
    padding: 20,
    marginLeft: 20,
    paddingLeft: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFB74D",
  },
});

export default login;
