import React, { useEffect, useRef } from "react"
import { Text, StyleSheet, Animated, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

const GoToLocalPopup = ({ location, isVisible }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const navigation = useNavigation()

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
            <Pressable onPress={() => navigation.navigate(location)}>
                <Animated.View
                    style={{ ...styles.container, opacity: fadeAnim }}
                >
                    <Text style={styles.message}>
                        Saiba mais sobre as atrações turísticas de {location}
                    </Text>
                </Animated.View>
            </Pressable>
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
        top: "25%",
        right: 16,
        alignItems: "center",
    },
    message: {
        color: "#000000",
    },
})

export default GoToLocalPopup
