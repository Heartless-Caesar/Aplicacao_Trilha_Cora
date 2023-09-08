import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from the appropriate package
import pdf_styles from "../styles/pdf_screen_styles";
import { getDistance } from "geolib";
import { useUserContext } from "../utils/userPersistence";

const PDFDownloadPage = ({ navigation }, props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, id } = useUserContext();

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
    <View style={pdf_styles.container}>
      {/* Reactangle */}
      <View style={pdf_styles.floatingRectangle}>
        <TouchableOpacity style={pdf_styles.menuIcon} onPress={toggleMenu}>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../assets/profile-pic.png")}
          style={pdf_styles.profilePic}
        />
      </View>
      {/* Menu itself */}
      <Animated.View style={[pdf_styles.menuContent, { opacity: menuOpacity }]}>
        {/* Add your menu items here */}
        <Pressable
          onPress={() => {
            navigation.replace("Home");
          }}
        >
          <Text style={pdf_styles.menuItem}>Home</Text>
        </Pressable>
        <Text style={pdf_styles.menuItem}>Menu Item 2</Text>
        {/* Insert more items in menu */}
      </Animated.View>
      {/* Insert more items in menu */}
      {pdfList.map((pdf, index) => (
        <TouchableOpacity
          key={index}
          style={pdf_styles.pdfContainer}
          onPress={() => handleDownload(pdf.url)}
        >
          <Text style={pdf_styles.pdfTitle}>{pdf.title}</Text>
          <TouchableOpacity style={pdf_styles.downloadButton}>
            <Text style={pdf_styles.buttonText}>Download</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PDFDownloadPage;
