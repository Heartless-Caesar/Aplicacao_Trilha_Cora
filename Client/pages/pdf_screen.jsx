/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import pdf_styles from "../styles/pdf_screen_styles";
import { useUserContext } from "../utils/userPersistence";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const PDFDownloadPage = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [fetchedLocals, setFetchedLocals] = useState({});
  const { id } = useUserContext();

  const fetchValidations = async () => {
    try {
      // Make a GET request with the user ID as a parameter
      const response = await axios.get(`http://192.168.1.13:5000/fetch`, {
        params: {
          userId: id,
        },
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

  useEffect(() => {
    fetchValidations();
  }, []);

  const pdfList = [];
  if (fetchedLocals.length >= 1) {
    const allowedProperties = [
      "cocal",
      "corumba",
      "frans",
      "ita",
      "itab",
      "jara",
      "pire",
    ];
    const locals = Object.keys(fetchedLocals[0]).filter((property) =>
      allowedProperties.includes(property)
    );

    for (let i = 0; i < locals.length; i++) {
      for (let j = i + 1; j < locals.length; j++) {
        pdfList.push({
          title: `${locals[i]} to ${locals[j]}`,
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
          startLocal: startLocal,
          endLocal: endLocal,
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

  return (
    <View style={pdf_styles.container}>
      {/* Components Below */}

      {/* Menu */}
      <View style={pdf_styles.floatingRectangle}>
        <TouchableOpacity style={pdf_styles.menuIcon} onPress={toggleMenu}>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={import("../assets/profile-pic.png")}
          style={pdf_styles.profilePic}
        />
      </View>

      {/* Menu itself */}
      <Animated.View style={[pdf_styles.menuContent, { opacity: menuOpacity }]}>
        {/* Add your menu items here */}
        <Pressable
          onPress={() => {
            // eslint-disable-next-line react/prop-types
            navigation.replace("Home");
          }}
        >
          <Text style={pdf_styles.menuItem}>Home</Text>
        </Pressable>
        <Text style={pdf_styles.menuItem}>Menu Item 2</Text>
        {/* Insert more items in menu */}
      </Animated.View>
      {fetchedLocals &&
        pdfList.map((pdf, index) => (
          <TouchableOpacity key={index} style={pdf_styles.pdfContainer}>
            <Text style={pdf_styles.pdfTitle}>
              Certificado de {pdf.startLocal} a {pdf.endLocal}
            </Text>
            <TouchableOpacity
              style={pdf_styles.downloadButton}
              onPress={() => handleDownload(pdf.startLocal, pdf.endLocal)}
            >
              <Text style={pdf_styles.buttonText}>Download</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default PDFDownloadPage;
