import React, { useEffect, useRef, useState } from "react"
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    Animated,
    Pressable,
    Button,
} from "react-native"
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    watchPositionAsync,
    LocationAccuracy,
} from "expo-location"
import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { Ionicons } from "@expo/vector-icons"
import { getDistance } from "geolib"
import NotificationPopup from "./notification_pop_up"
import { useIsConnected } from "react-native-offline"
import coordinates from "../assets/coordinates"
import { keyLocations } from "../assets/keyLocations"
import { useUserContext } from "../utils/userPersistence"
import axios from "axios"
import * as FileSystem from "expo-file-system"
const INTIAL_POSITION = { latitude: -15.924442, longitude: -48.80753 }
import PropTypes from "prop-types"
import { useNavigation } from "@react-navigation/native"
import GoToLocalPopup from "./GoToLocalNotification"

const localNames = {
    cid_go: "Cidade de Goiás",
    cocal: "Cocalzinho de Goiás",
    pire: "Pirenópolis",
    frans: "São Francisco de Goiás",
    jara: "Jaraguá",
    ita: "Itaguari",
    corumba: "Corumbá",
    ferr: "Ferreiro",
    calc: "Calcilândia",
    bene: "São Benedito",
    vila: "Vila Aparecida",
    radio: "Radiolândia",
}

/*eslint max-lines: ["error", 500]*/

const MapScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [visitedCoordinates, setVisitedCoordinates] = useState([])
    const [notificationMessage, setNotificationMessage] = useState("")
    const [isNotificationVisible, setIsNotificationVisible] = useState(false)
    const [isGoToLocalVisible, setIsGoToLocalVisible] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [isSimulationRunning, setIsSimulationRunning] = useState(false)
    const [validationPoints, setValidationPoints] = useState([])
    const [initialPosition, setInitialPosition] = useState(INTIAL_POSITION)
    const [localKey, setLocalKey] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [showLocalPressable, setShowLocalPressable] = useState(false)
    const [goToLocal, setGoToLocal] = useState("")

    const mapRef = useRef(null)
    const network = useIsConnected()
    const { id } = useUserContext()

    const { navigate } = useNavigation() // Get the navigation function

    const navigateToLocalScreen = () => {
        if (localKey) {
            navigate(localNames[localKey]) // Navigate to the local screen
        }
    }

    //Busca as localizações chave, se estiver falso manda para ser verdadeiro, se for verdadeiro nada será feito
    // * Se local ja nao tiver sido passado ao chegar proximo aquele local para aquele usuario sera validado
    const fetchLocals = async () => {
        console.log(`Id param: ${id}`)
        try {
            const response = await axios.get(
                `http://${process.env.BASE_URL}/fetch`,
                {
                    params: {
                        userId: id,
                    },
                }
            )

            console.log("Data fetch successful:", response.data.Locals)

            // Ensure response.data is an array before setting it as validationPoints
            if (Array.isArray(response.data.Locals)) {
                setValidationPoints(response.data.Locals)
                console.log(validationPoints)
            } else {
                console.error("Received data is not an array:", response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (id !== undefined && id !== null) {
            fetchLocals()
        } else {
            console.log("Id is not valid:", id)
        }
    }, [id])

    /*eslint max-lines-per-function: ["error", 500]*/
    const simulateUserMovement = async () => {
        if (isSimulationRunning) {
            console.log("Simulation is already running.")
            return
        }

        setIsSimulationRunning(true)

        let lastPatchTime = 0 // Variable to track the time of the last patch request

        try {
            for (let i = 0; i < coordinates.length; i++) {
                const coordinate = coordinates[i]
                // console.log(
                //     `Moving to coordinate: ${JSON.stringify(coordinate)}`
                // )

                // Update the user's location (marker) on the map
                setLocation({
                    coords: {
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                    },
                })

                await new Promise((resolve) => setTimeout(resolve, 300))

                const locationKey = getKeyForCoordinate(coordinate)
                const locationValidated = isLocationValidated(locationKey)
                console.log(locationValidated)
                if (!locationValidated) {
                    const currentTime = Date.now()
                    const timeElapsed = currentTime - lastPatchTime

                    if (timeElapsed >= 30000) {
                        // Check if 30 seconds have passed
                        const closeToKeyLocation = keyLocations.some(
                            async (keyLocation) => {
                                // ... (existing code for checking location proximity)

                                if (!locationValidated) {
                                    const index = validationPoints.findIndex(
                                        (point) => point === locationKey
                                    )

                                    if (index !== -1) {
                                        const updatedValidationPoints = [
                                            ...validationPoints,
                                        ]
                                        updatedValidationPoints[index] = true
                                        setValidationPoints(
                                            updatedValidationPoints
                                        )
                                    }

                                    await axios.patch(
                                        `http://${process.env.BASE_URL}/update`,
                                        {
                                            local: locationKey,
                                            userId: id,
                                        }
                                    )

                                    lastPatchTime = Date.now() // Update the last patch time
                                    triggerNotification(locationKey)
                                }

                                return true
                            }
                        )

                        if (!closeToKeyLocation) {
                            console.log(
                                "User is not close to any key location."
                            )
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Simulation error:", error)
        } finally {
            console.log("Simulation completed.")
            setIsSimulationRunning(false)
        }
    }

    const clearNotification = () => {
        setNotificationMessage("")
    }

    const requestPosition = async () => {
        const { granted } = await requestForegroundPermissionsAsync()

        if (granted) {
            const currentPosition = await getCurrentPositionAsync()
            setLocation(currentPosition)
            setInitialPosition({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
            })
            console.log("Initial position set:", initialPosition)
        }
    }

    useEffect(() => {
        requestPosition()
    }, [])

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
            )

            const locationKey = getKeyForCoordinate(coordinate)

            // Check if the location is close and not already validated
            if (distance <= 6000 && isLocationValidated(locationKey) == false) {
                axios
                    .patch(`http://${process.env.BASE_URL}/update`, {
                        local: locationKey,
                        userId: id,
                    })
                    .then((response) => {
                        console.log("Patch request successful:", response.data)
                    })
                    .catch((error) => {
                        console.error("Patch request error:", error)
                    })

                triggerNotification(locationKey)
                console.log("Sent to api")
            }

            return distance <= 6000
        }
        return false
    }

    const getKeyForCoordinate = (coordinate) => {
        let closestLocationKey = null
        let closestDistance = Infinity

        keyLocations.forEach((item) => {
            const locationKey = Object.keys(item)[0]
            const { latitude, longitude } = item[locationKey]
            const distance = getDistance(coordinate, { latitude, longitude })

            if (distance < closestDistance) {
                closestDistance = distance
                closestLocationKey = locationKey
            }
        })

        return closestLocationKey
    }

    const isLocationValidated = (locationKey) => {
        return validationPoints[locationKey] === true
    }

    const updateVisitedCoordinates = () => {
        const updatedVisitedCoordinates = keyLocations.reduce(
            (acc, locationObj) => {
                const [locationKey] = Object.keys(locationObj)
                const { latitude, longitude } = locationObj[locationKey]

                if (isCloseToCoordinate({ latitude, longitude })) {
                    acc.push(locationKey)
                    const localName =
                        localNames[locationKey] ||
                        "Ponto de Interesse Desconhecido"
                    const message = `Parabéns! Você passou pelo ponto de interesse: ${localName}`
                    setNotificationMessage(message)
                }

                return acc
            },
            []
        )

        setVisitedCoordinates(updatedVisitedCoordinates)

        // Salva pings em um arquivo JSON caso esteja offline
        if (!network) {
            const filePath = `${FileSystem.documentDirectory}visitedCoordinates.json`
            FileSystem.writeAsStringAsync(
                filePath,
                JSON.stringify(updatedVisitedCoordinates)
            )
                .then(() => console.log("Visited coordinates saved to file"))
                .catch((error) =>
                    console.error("Error saving visited coordinates:", error)
                )
        }
    }

    useEffect(() => {
        // Function to read the file when both online and the file exists
        const readVisitedCoordinatesFile = async () => {
            try {
                const filePath = `${FileSystem.documentDirectory}visitedCoordinates.json`
                const fileExists = await FileSystem.getInfoAsync(filePath)

                if (network && fileExists.exists) {
                    const data = await FileSystem.readAsStringAsync(filePath)
                    if (data) {
                        setVisitedCoordinates(JSON.parse(data))
                    }
                } else {
                    console.log("Arquivo não encontrado")
                }
            } catch (error) {
                console.error("Error reading visited coordinates:", error)
            }
        }

        // Trigger the file reading when the network or other dependencies change
        readVisitedCoordinatesFile()
    }, [network])

    // Call updateVisitedCoordinates whenever the user's location changes
    useEffect(() => {
        updateVisitedCoordinates()
    }, [location])

    useEffect(() => {
        watchPositionAsync(
            {
                accuracy: LocationAccuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 1,
            },
            (res) => {
                //console.log(res)
                setLocation(res)
                mapRef.current?.animateCamera({ center: res.coords })
            }
        )
    }, [])

    useEffect(() => {
        if (notificationMessage) {
            const notificationTimeout = setTimeout(() => {
                clearNotification()
            }, 5000) // Notification will disappear after 5 seconds

            return () => clearTimeout(notificationTimeout)
        }
    }, [notificationMessage])

    const menuOpacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(menuOpacity, {
            toValue: showMenu ? 1 : 0,
            duration: 150,
            useNativeDriver: true,
        }).start()
    }, [showMenu])

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    //Emular passagem de local
    const triggerNotification = (locationKey) => {
        console.log(goToLocal)
        const localName =
            localNames[locationKey] || "Ponto de Interesse Desconhecido"
        const message = `Parabéns! Você passou pelo ponto de interesse: ${localName}`
        setGoToLocal(localName)
        setNotificationMessage(message)
        setLocalKey(locationKey) // Set the local key for navigation
        setShowLocalPressable(true)
        setIsNotificationVisible(true)
        setIsGoToLocalVisible(true)
        setTimeout(() => {
            setIsNotificationVisible(false)
            setIsGoToLocalVisible(false)
        }, 3000)
    }

    const pinColor = "blue"

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude:
                        location?.coords.latitude || INTIAL_POSITION.latitude,
                    longitude:
                        location?.coords.longitude || INTIAL_POSITION.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        pinColor={pinColor}
                    />
                )}
                {keyLocations &&
                    keyLocations.map((item) => {
                        const locationKey = Object.keys(item)[0]
                        const { latitude, longitude } = item[locationKey]
                        return (
                            <Marker
                                key={locationKey}
                                coordinate={{ latitude, longitude }}
                                title={locationKey}
                            />
                        )
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
            </View>
            {/* Offline indicator */}
            {network ? (
                <View style={styles.networkFloatingRectangle}>
                    <Text style={styles.networkText}>Conectado a rede</Text>
                </View>
            ) : (
                <View style={styles.networkFloatingRectangle}>
                    <Text style={styles.networkText}>Você está offline</Text>
                </View>
            )}
            {isNotificationVisible && (
                <NotificationPopup
                    message={notificationMessage}
                    isVisible={isNotificationVisible}
                    navigation={navigation}
                    local={goToLocal}
                />
            )}

            <Animated.View
                style={[styles.menuContent, { opacity: menuOpacity }]}
            >
                {/* Add your menu items here */}
                <Pressable
                    onPress={() => {
                        // eslint-disable-next-line react/prop-types
                        navigation.replace("PDF")
                    }}
                >
                    <Text style={styles.menuItem}>Certificados</Text>
                </Pressable>
                <Text style={styles.menuItem}>Informações turísticas</Text>
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
                        isSimulationRunning
                            ? "Simulation Running"
                            : "Start Simulation"
                    }
                    onPress={simulateUserMovement}
                    disabled={isSimulationRunning}
                />
            </View>
        </View>
    )
}

/******************** Tipando props do componente **************************/

MapScreen.propTypes = {
    navigation: PropTypes.any,
}

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
        top: "12%",
        right: "37%",
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 4,
        padding: 10,
    },
    menuItem: {
        paddingVertical: 8,
        fontSize: 25,
    },
    networkFloatingRectangle: {
        position: "absolute",
        top: "13%",
        left: 20,
        right: 20,
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "green", // You can set your preferred background color
        borderRadius: 10,
        elevation: 4,
    },
    networkText: {
        fontSize: 18,
        color: "white", // You can set your preferred text color
    },
    goToContainer: {
        backgroundColor: "#FAFAFA",
        borderColor: "#000",
        borderWidth: 1,
        padding: 13,
        borderRadius: 10,
        position: "absolute",
        height: "5%",
        bottom: 16,
        left: 16,
        top: "20%",
        right: 16,
        alignItems: "center",
    },
    goToMessage: {
        color: "#000000",
    },
})

export default MapScreen
