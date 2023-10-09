import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from the appropriate package
import pdf_styles from "../styles/pdf_screen_styles";
import { useUserContext } from "../utils/userPersistence";
import axios from "axios";

const PDFDownloadPage = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [local_1, setLocal_1] = useState({});
  const [local_2, setLocal_2] = useState({});
  const [fetchedLocals, setFetchedLocals] = useState({});
  const { locals, id } = useUserContext();

  const pdfList = [];
  if (locals.length >= 2) {
    for (let i = 0; i < locals.length; i++) {
      for (let j = i + 1; j < locals.length; j++) {
        pdfList.push({
          title: `${locals[i].name} to ${locals[j].name}`,
          startLocal: locals[i],
          endLocal: locals[j],
        });
      }
    }
  }

  const handleDownload = async (startLocal, endLocal) => {
    try {
      // Make a POST request to your API to generate the PDF
      const response = await axios.post(
        "http://192.168.1.13:5000/generate-pdf",
        {
          startLocal,
          endLocal,
        }
      );

      if (response.status === 200) {
        // Handle successful response (e.g., display success message)
        console.log("PDF generated successfully:", response.data);
      } else {
        // Handle unexpected response status
        console.log("Unexpected response:", response.status);
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error:", error.message);
    }
  };

  const fetchValidations = async () => {
    try {
      // Make a GET request with the user ID as a parameter
      const response = await axios.get(`http://192.168.1.13:5000/fetch`, {
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

  useEffect(() => {
    fetchValidations();
  }, []);

  return (
    <View style={pdf_styles.container}>
      {/* Components Below */}
      {locals &&
        pdfList.map((pdf, index) => (
          <TouchableOpacity key={index} style={pdf_styles.pdfContainer}>
            <Text style={pdf_styles.pdfTitle}>{pdf.title}</Text>
            <TouchableOpacity
              style={pdf_styles.downloadButton}
              onPress={() => handleDownload(local_1.local, local_2.local)}
            >
              <Text style={pdf_styles.buttonText}>Download</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

      {/* Menu */}
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
    </View>
  );
};

export default PDFDownloadPage;
