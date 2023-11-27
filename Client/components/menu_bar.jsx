import React, { useEffect, useState, useRef } from "react"
import {
    View,
    Text,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

const Menu_Bar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const navigation = useNavigation()
    const menuOpacity = useRef(new Animated.Value(0)).current

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    useEffect(() => {
        Animated.timing(menuOpacity, {
            toValue: showMenu ? 1 : 0,
            duration: 150,
            useNativeDriver: true,
        }).start()
    }, [showMenu])

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
            top: "8%",
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
        menuContent: {
            position: "absolute",
            top: "14%",
            right: 256,
            backgroundColor: "white",
            borderRadius: 8,
            elevation: 4,
            padding: 10,
            zIndex: 2,
        },
        menuItem: {
            paddingVertical: 8,
            fontSize: 25,
        },
    })

    return (
        <>
            <View style={styles.floatingRectangle}>
                <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
                    <Ionicons name="menu-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Animated.View
                style={[styles.menuContent, { opacity: menuOpacity }]}
            >
                {showMenu && (
                    <>
                        <Pressable
                            onPress={() => {
                                // eslint-disable-next-line react/prop-types
                                navigation.replace("Home")
                            }}
                        >
                            <Text style={styles.menuItem}>Início</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                // eslint-disable-next-line react/prop-types
                                navigation.replace("PDF")
                            }}
                        >
                            <Text style={styles.menuItem}>Certificados</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                // eslint-disable-next-line react/prop-types
                                navigation.replace("Validate")
                            }}
                        >
                            <Text style={styles.menuItem}>Validação</Text>
                        </Pressable>
                    </>
                )}
            </Animated.View>
        </>
    )
}

export default Menu_Bar
