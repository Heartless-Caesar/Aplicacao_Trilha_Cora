import React, { useEffect, useRef, useState } from "react";
import {
  View,
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
import { Ionicons } from "@expo/vector-icons";
import { getDistance } from "geolib";
import NotificationPopup from "./notification_pop_up";
import { useIsConnected } from "react-native-offline";
import coordinates from "../assets/coordinates";
import { keyLocations } from "../assets/keyLocations";
import { useUserContext } from "../utils/userPersistence";
import axios from "axios";
import FileSystem from "expo-file-system";
const INTIAL_POSITION = { latitude: -15.924442, longitude: -48.80753 };
import PropTypes from "prop-types";

/*eslint max-lines: ["error", 500]*/
const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [visitedCoordinates, setVisitedCoordinates] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [validationPoints, setValidationPoints] = useState([]);
  const [initialPosition, setInitialPosition] = useState(INTIAL_POSITION);

  const mapRef = useRef(null);
  const network = useIsConnected();
  const { id } = useUserContext();

  //Busca as localizações chave, se estiver falso manda para ser verdadeiro, se for verdadeiro nada será feito
  // * Se local ja nao tiver sido passado ao chegar proximo aquele local para aquele usuario sera validado
  useEffect(() => {
    axios
      .get(`http://localhost/api/user/locals/${id}`)
      .then((response) => {
        console.log("Data fetch successful:", response.data);
        setValidationPoints(response.data);
      })
      .catch((error) => {
        console.error("Data fetch unsuccessful:", error);
      });
  }, []);

  /*eslint max-lines-per-function: ["error", 500]*/
  const simulateUserMovement = async () => {
    if (isSimulationRunning) {
      console.log("Simulation is already running.");
      return;
    }

    setIsSimulationRunning(true);

    try {
      for (let i = 0; i < coordinates.length; i++) {
        const coordinate = coordinates[i];
        console.log(`Moving to coordinate: ${JSON.stringify(coordinate)}`);

        // Update the user's location (marker) on the map
        setLocation({
          coords: {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if the location is already validated (true)
        // Check if the location is already validated (true)
        const locationKey = getKeyForCoordinate(coordinate);
        const locationValidated = isLocationValidated(locationKey);

        // Only send the PATCH request if the location is not validated (false)
        if (!locationValidated) {
          const closeToKeyLocation = keyLocations.some((keyLocation) => {
            const locationKey = Object.keys(keyLocation)[0];
            const distance = getDistance(coordinate, keyLocation[locationKey]);
            if (distance <= 2000) {
              console.log(`User is close to the key location: ${locationKey}`);
              triggerNotification(locationKey);

              // Validate the location only if it's not already validated (false)
              if (!isLocationValidated(locationKey)) {
                axios
                  .patch("http://192.168.1.13:5000/update", {
                    local: locationKey,
                    userId: id,
                  })
                  .then((response) => {
                    console.log("Patch request successful:", response.data);
                  })
                  .catch((error) => {
                    console.error("Patch request error:", error);
                  });
              }

              return true;
            }
            return false;
          });

          if (!closeToKeyLocation) {
            console.log("User is not close to any key location.");
          }
        }
      }
    } catch (error) {
      console.error("Simulation error:", error);
    } finally {
      console.log("Simulation completed.");
      setIsSimulationRunning(false);
    }
  };

  const clearNotification = () => {
    setNotificationMessage("");
  };

  const requestPosition = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setInitialPosition({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
      console.log("Initial position set:", initialPosition);
    }
  };

  useEffect(() => {
    requestPosition();
  }, []);

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

      const locationKey = getKeyForCoordinate(coordinate);

      // Check if the location is close and not already validated
      if (distance <= 6000 && !isLocationValidated(locationKey)) {
        axios
          .patch("http://192.168.1.13:5000/update", {
            local: locationKey,
            userId: id,
          })
          .then((response) => {
            console.log("Patch request successful:", response.data);
          })
          .catch((error) => {
            console.error("Patch request error:", error);
          });

        console.log("Sent to api");
      }

      return distance <= 6000;
    }
    return false;
  };

  const getKeyForCoordinate = (coordinate) => {
    let closestLocationKey = null;
    let closestDistance = Infinity;

    keyLocations.forEach((item) => {
      const locationKey = Object.keys(item)[0];
      const { latitude, longitude } = item[locationKey];
      const distance = getDistance(coordinate, { latitude, longitude });

      if (distance < closestDistance) {
        closestDistance = distance;
        closestLocationKey = locationKey;
      }
    });

    return closestLocationKey;
  };

  const isLocationValidated = (locationKey) => {
    return validationPoints.some((point) => point === locationKey);
  };

  const updateVisitedCoordinates = () => {
    const updatedVisitedCoordinates = keyLocations.reduce(
      (acc, locationObj) => {
        const [locationKey] = Object.keys(locationObj);
        const { latitude, longitude } = locationObj[locationKey];

        if (isCloseToCoordinate({ latitude, longitude })) {
          acc.push(locationKey);
        }

        return acc;
      },
      []
    );

    setNotificationMessage("Parabéns! Você passou por mais um ponto chave");
    updatedVisitedCoordinates(updatedVisitedCoordinates);

    // Salva pings em um arquivo JSON caso esteja offline
    if (!network) {
      const filePath = `${FileSystem.documentDirectory}visitedCoordinates.json`;
      FileSystem.writeAsStringAsync(
        filePath,
        JSON.stringify(updatedVisitedCoordinates)
      )
        .then(() => console.log("Visited coordinates saved to file"))
        .catch((error) =>
          console.error("Error saving visited coordinates:", error)
        );
    }
  };

  useEffect(() => {
    // Busca coordenadas do arquivo JSON para ser verificada posteriormente
    if (!network) {
      const filePath = `${FileSystem.documentDirectory}visitedCoordinates.json`;
      FileSystem.readAsStringAsync(filePath)
        .then((data) => {
          if (data) {
            setVisitedCoordinates(JSON.parse(data));
          }
        })
        .catch((error) =>
          console.error("Error reading visited coordinates:", error)
        );
    }
  }, [network]);

  // Call updateVisitedCoordinates whenever the user's location changes
  useEffect(() => {
    updateVisitedCoordinates();
  }, [location]);

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
  const triggerNotification = (locationKey) => {
    setNotificationMessage(
      `Parabéns! Você passou pelo ponto de interesse: ${locationKey}`
    );
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
          keyLocations.map((item) => {
            const locationKey = Object.keys(item)[0];
            const { latitude, longitude } = item[locationKey];
            return (
              <Marker
                key={locationKey}
                coordinate={{ latitude, longitude }}
                title={locationKey}
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
          // eslint-disable-next-line no-undef
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
            // eslint-disable-next-line react/prop-types
            navigation.replace("PDF");
          }}
        >
          <Text style={styles.menuItem}>Certificados</Text>
        </Pressable>
        <Text style={styles.menuItem}>Menu Item 2</Text>
        {/* ... */}
      </Animated.View>

      {/* <View style={home_styles.notificationButton}>
        <Button title="Trigger Notification" onPress={triggerNotification} />
      </View> */}
      <View
        style={{
          position: "absolute",
          bottom: 65,
          right: 0,
          left: "0%",
          alignItems: "center",
        }}
      >
        {/* Button to trigger the simulation */}
        <Button
          title={
            isSimulationRunning ? "Simulation Running" : "Start Simulation"
          }
          onPress={simulateUserMovement}
          disabled={isSimulationRunning}
        />
      </View>
    </View>
  );
};

/******************** Tipando props do componente **************************/

MapScreen.propTypes = {
  navigation: PropTypes.node,
};

/************************************************************************* */

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
