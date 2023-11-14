import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import React from "react"
import input_style from "../styles/custom_input_style"
import { Ionicons } from "@expo/vector-icons" // Import the Eye icon from your library

const CustomInput = (props) => {
    const isPassword = props.secureTextEntry // Check if it's a password input

    const togglePasswordVisibility = () => {
        props.togglePasswordVisibility()
    }

    return (
        <View style={input_style.container}>
            <TextInput
                secureTextEntry={props.secureTextEntry}
                style={input_style.input}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.setValue}
            />
            {isPassword != null && (
                // Conditionally render the Eye icon for password inputs
                <TouchableOpacity
                    style={styles.eyeIcon} // Added style for Eye icon container
                >
                    <Ionicons
                        name={isPassword == false ? "eye-off" : "eye"}
                        size={24}
                        color="black"
                        onPress={togglePasswordVisibility}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    eyeIcon: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -12 }], // Adjust this value for vertical centering
    },
})

export default CustomInput
