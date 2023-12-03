import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"

const Card = ({ data }) => {
    return (
        <View style={styles.card}>
            {/* <Image source={{ uri: data.image }} style={styles.image} /> */}
            <Text style={styles.text}>{data.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#ddd",
        margin: 10,
        padding: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
})

export default Card
