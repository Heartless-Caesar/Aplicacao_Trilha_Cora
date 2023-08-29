import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Pressable,
} from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from the appropriate package

import coordinates from "../assets/coordinates";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INTIAL_POSITION = { latitude: -15.924442, longitude: -48.80753 };

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [visitedCoordinates, setVisitedCoordinates] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const mapRef = useRef(null);

  const requestPosition = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log(location);
    }
  };

  useEffect(() => {
    requestPosition();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (res) => {
        console.log(res);
        setLocation(res);
        mapRef.current?.animateCamera({ pitch: 70, center: res.coords });
      }
    );
  }, []);

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
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location?.coords.latitude || INTIAL_POSITION.latitude,
          longitude: location?.coords.longitude || INTIAL_POSITION.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}
        <Polyline
          coordinates={coordinates}
          strokeColor="#FF0000"
          strokeWidth={2}
        />
      </MapView>

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
            navigation.replace("PDF");
          }}
        >
          <Text style={styles.menuItem}>Certificados</Text>
        </Pressable>
        <Text style={styles.menuItem}>Menu Item 2</Text>
        {/* ... */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  floatingRectangle: {
    position: "absolute",
    top: "6%",
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
    top: "12%", // Adjust the top position as needed
    right: "74%",
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 8,
  },
});

export default MapScreen;
