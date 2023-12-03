import React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import Card from "../../components/custom_info_card"
import Menu_Bar from "../../components/menu_bar"
import Image1 from "../../assets/Images/Corumba/Igreja-Matriz-Nossa-Senhora-da-Penha-de-França-Imagem-Marcosviniciusrs-768x576.jpg"
import Image2 from "../../assets/Images/Corumba/salto_corumba.jpg"
import Image3 from "../../assets/Images/Corumba/teatro_esmeralda.jpg"

const Corumba = () => {
    const cardData = [
        { image: Image1, text: "Card 1" },
        { image: Image2, text: "Card 2" },
        { image: Image3, text: "Card 3" },
    ]

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

export default Corumba
