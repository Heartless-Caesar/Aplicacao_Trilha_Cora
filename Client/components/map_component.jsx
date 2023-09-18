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
  Button,
} from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from the appropriate package
import { getDistance } from "geolib";
import NotificationPopup from "./notification_pop_up";

import coordinates from "../assets/coordinates";
import { keyLocations } from "../assets/keyLocations";
import home_styles from "../styles/home_page_styles";

const { width, height } = Dimensions.get("window");
//const ASPECT_RATIO = width / height;
//const LATITUDE_DELTA = 0.02;
//const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INTIAL_POSITION = { latitude: -15.924442, longitude: -48.80753 };

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [visitedCoordinates, setVisitedCoordinates] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const mapRef = useRef(null);

  const clearNotification = () => {
    setNotificationMessage("");
  };

  const requestPosition = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log(location);
    }
  };

  const isCloseToCoordinate = (coordinate) => {
    if (location) {
      const distance = getDistance(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }
      );

      // Adjust the threshold distance (e.g., 50 meters) as needed
      return distance <= 2000; // You can change the threshold as per your requirement
    }
    return false;
  };

  const updateVisitedCoordinates = () => {
    const updatedVisitedCoordinates = keyLocations.filter((coordinate) =>
      isCloseToCoordinate(coordinate)
    );

    setNotificationMessage(`Parabéns! Você passou por mais um ponto chave`);

    setVisitedCoordinates(updatedVisitedCoordinates);
  };

  // Call updateVisitedCoordinates whenever the user's location changes
  useEffect(() => {
    updateVisitedCoordinates();
  }, [location]);

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

  useEffect(() => {
    if (notificationMessage) {
      const notificationTimeout = setTimeout(() => {
        clearNotification();
      }, 5000); // Notification will disappear after 5 seconds

      return () => clearTimeout(notificationTimeout);
    }
  }, [notificationMessage]);

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

  //Emular passagem de local
  const triggerNotification = () => {
    setNotificationMessage("Parabéns! Você passou por um ponto de interesse");
    setIsNotificationVisible(true);

    // Clear the notification after 3 seconds
    setTimeout(() => {
      setIsNotificationVisible(false);
    }, 3000);
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
        {keyLocations &&
          keyLocations.map((item, idx) => {
            return (
              <Marker
                key={idx}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
              />
            );
          })}
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
      {notificationMessage && (
        <NotificationPopup
          message={notificationMessage}
          isVisible={isNotificationVisible}
        />
      )}
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

      <View style={home_styles.notificationButton}>
        <Button title="Trigger Notification" onPress={triggerNotification} />
      </View>
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
