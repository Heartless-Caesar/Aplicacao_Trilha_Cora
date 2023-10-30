// NotificationPopup.js
import React, { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"

const NotificationPopup = ({ message, isVisible }) => {
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

    return (
        isVisible && (
            <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                <Text style={styles.message}>{message}</Text>
            </Animated.View>
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
