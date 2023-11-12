import React, { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"

const GoToLocalPopup = ({ location, isVisible }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (isVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start()

            // Hide the popup after 3 seconds
            const hideTimeout = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start()
            }, 3000) // 3000 milliseconds = 3 seconds

            return () => clearTimeout(hideTimeout) // Clean up the timeout on unmount
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start()
        }
    }, [fadeAnim, isVisible, location])

    return (
        isVisible && (
            <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                <Text style={styles.message}>
                    Saiba mais sobre as atrações turísticas de {location}
                </Text>
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

export default GoToLocalPopup
