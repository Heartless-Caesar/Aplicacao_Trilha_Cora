import React from "react"
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native"
import Menu_Bar from "../components/menu_bar"
import CustomInput from "../components/customInput"

const Locals = ({ navigation }) => {
    const pages = [
        { name: "Cocalzinho", route: "Cocal" },
        { name: "Corumbá", route: "Corumba" },
        { name: "São Francisco", route: "Fran" },
        { name: "Itaberaí", route: "Itab" },
        { name: "Itaguari", route: "Ita" },
        { name: "Jaraguá", route: "Jara" },
        { name: "Pirenópolis", route: "Pire" },
    ]

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.pageButton}
            onPress={() => navigation.navigate(item.route)}
        >
            <Text style={styles.pageText}>{item.name}</Text>
        </TouchableOpacity>
    )

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Text style={styles.title}>Selecione um local</Text>
            <Menu_Bar style={styles.menuBar} />
            <View style={styles.list}>
                <FlatList
                    data={pages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.route}
                    contentContainerStyle={styles.pageList}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: "90%",
    },
    menuBar: {
        // Add styling for your menu bar to ensure it's not accidentally pressed
    },
    pageList: {
        alignItems: "center",
        //marginTop: 160,
    },
    pageButton: {
        backgroundColor: "#FFCC80",
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        width: 200,
        alignItems: "center",
    },
    pageText: {
        color: "#fff",
        fontSize: 18,
    },
    list: {
        marginTop: 20,
    },
})

export default Locals
