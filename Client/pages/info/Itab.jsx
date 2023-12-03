import React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import Card from "../../components/custom_info_card"
import Menu_Bar from "../../components/menu_bar"
import Image from "../../assets/Images/Itaberai/igreja_sao_sebastiao.jpg"

const Itab = () => {
    const cardData = [{ image: Image, text: "Card 1" }]

    const renderItem = ({ item }) => <Card data={item} />

    return (
        <View style={styles.container}>
            <Menu_Bar style={styles.menuBar} />
            <FlatList
                data={cardData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.content}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        alignItems: "center",
        marginTop: 160,
    },
    menuBar: {
        // Add styling for your menu bar to ensure it's not accidentally pressed
    },
})

export default Itab
