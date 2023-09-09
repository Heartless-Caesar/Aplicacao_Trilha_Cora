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

const PDFDownloadPage = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [local_1, setLocal_1] = useState({});
  const [local_2, setLocal_2] = useState({});
  const [fetchedLocals, setFetchedLocals] = useState({});
  const { user, id } = useUserContext();

  const pdfList = [
    { title: "Sample PDF 1", url: "https://example.com/sample1.pdf" },
    { title: "Sample PDF 2", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 3", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 4", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 5", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 6", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 7", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 8", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 9", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 10", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 11", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 12", url: "https://example.com/sample2.pdf" },
    { title: "Sample PDF 13", url: "https://example.com/sample2.pdf" },
  ];

  const fetchValidations = async () => {
    try {
      // Make a GET request with the user ID as a parameter
      const response = await axios.get(`http://192.168.1.13:5000/locals/`, {
        userId: id,
      });

      if (response.status === 200) {
        // Data was fetched successfully
        setFetchedLocals(response.data);
        console.log("Data:", response.data);
      } else {
        // Handle unexpected response status
        console.log("Unexpected response:", response.status);
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error:", error.message);
    }
  };

  const fetchData = async () => {
    try {
      // Make a GET request with the user ID as a parameter
      const response = await axios.get(
        `http://192.168.1.13:5000/data?userId=${id}?local_1=${local_1}?local_2=${local_2}`
      );

      if (response.status === 200) {
        // Data was fetched successfully
        console.log("Data:", response.data);
      } else {
        // Handle unexpected response status
        console.log("Unexpected response:", response.status);
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error:", error.message);
    }
  };

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

  useEffect(() => {
    fetchValidations();
  }, []);

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
          <TouchableOpacity
            style={pdf_styles.downloadButton}
            onPress={() => fetchData()}
          >
            <Text style={pdf_styles.buttonText}>Download</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PDFDownloadPage;
