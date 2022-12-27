import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login_screen from "./pages/login_screen";

export default function App() {
  return (
    <View style={styles.container}>
      <Login_screen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC",
    alignItems: "center",
    justifyContent: "center",
  },
});
