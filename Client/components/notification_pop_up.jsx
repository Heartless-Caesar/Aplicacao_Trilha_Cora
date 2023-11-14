// NotificationPopup.js
import React, { useEffect, useRef } from "react"
import {
    Text,
    StyleSheet,
    Animated,
    Pressable,
    TouchableOpacity,
} from "react-native"

const NotificationPopup = ({ message, isVisible, navigation, local }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (isVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start()
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start()
        }
    }, [fadeAnim, isVisible])

    const navigateToGoToLocal = () => {
        navigation.replace(local) // Navigate to the 'GoToLocal' page
    }

    return (
        isVisible && (
            //<TouchableOpacity onPress={navigateToGoToLocal}>
            <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                <Text style={styles.message}>{message}</Text>
            </Animated.View>
            //</TouchableOpacity>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FAFAFA",
        borderColor: "#000",
        borderWidth: 1,
        padding: 13,
        borderRadius: 10,
        position: "absolute",
        height: "5%",
        bottom: 16,
        left: 16,
        top: "18%",
        right: 16,
        alignItems: "center",
    },
    message: {
        color: "#000000",
    },
})

export default NotificationPopup
