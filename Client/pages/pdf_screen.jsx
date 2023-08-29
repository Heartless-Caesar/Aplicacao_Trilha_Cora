import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from the appropriate package

const PDFDownloadPage = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const pdfList = [
    { title: "Sample PDF 1", url: "https://example.com/sample1.pdf" },
    { title: "Sample PDF 2", url: "https://example.com/sample2.pdf" },
    // Add more PDFs as needed
  ];

  const menuOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(menuOpacity, {
      toValue: showMenu ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [showMenu]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDownload = (url) => {
    // Implement your PDF download logic here
    console.log("Downloading PDF from:", url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.floatingRectangle}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../assets/profile-pic.png")}
          style={styles.profilePic}
        />
      </View>
      <Animated.View style={[styles.menuContent, { opacity: menuOpacity }]}>
        {/* Add your menu items here */}
        <Pressable
          onPress={() => {
            navigation.replace("Home");
          }}
        >
          <Text style={styles.menuItem}>Home</Text>
        </Pressable>
        <Text style={styles.menuItem}>Menu Item 2</Text>
        {/* ... */}
      </Animated.View>
      {pdfList.map((pdf, index) => (
        <TouchableOpacity
          key={index}
          style={styles.pdfContainer}
          onPress={() => handleDownload(pdf.url)}
        >
          <Text style={styles.pdfTitle}>{pdf.title}</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: "50%",
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
});

export default PDFDownloadPage;
