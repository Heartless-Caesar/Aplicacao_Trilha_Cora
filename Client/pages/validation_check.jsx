import React, { useState, useEffect } from "react"
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from "react-native"
import axios from "axios"
import CustomInput from "../components/customInput"
import Menu_Bar from "../components/menu_bar"

const Validation_Check = () => {
    const [identifier, setIdentifier] = useState(0)
    const [identifierText, setIdentifierText] = useState()
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState(null)

    const fetchResult = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                `http://${process.env.BASE_URL}/fetch/${identifier}`,
                {
                    params: {
                        certificateId: identifier,
                    },
                }
            )

            // Check the HTTP status code
            if (res.status === 404) {
                setErrorText("Certificado não encontrado")
                setResult([])
            } else {
                setResult([res.data])
                setIdentifierText(identifier)
                console.log(result)
                setErrorText(null)
            }

            setIdentifier()
        } catch (error) {
            console.error("Error fetching result:", error)
            setErrorText("Erro na busca do certificado")
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Text style={styles.title}>Verificação de Integridade</Text>
            <Menu_Bar style={styles.menuBar} />
            <CustomInput
                placeholder="Identificador..."
                value={identifier}
                setValue={setIdentifier}
            />
            <Pressable style={styles.button} onPress={fetchResult}>
                <Text style={styles.buttonText}>Buscar</Text>
            </Pressable>
            {loading ? (
                <ActivityIndicator
                    style={styles.loadingSpinner}
                    size="large"
                    color="#3498db"
                />
            ) : (
                <View style={styles.resultContainer}>
                    {errorText ? (
                        <Text style={styles.errorText}>{errorText}</Text>
                    ) : Array.isArray(result) && result.length > 0 ? (
                        result.map((item, index) => (
                            <View key={index} style={styles.resultItem}>
                                <Text style={styles.emphasizedText}>
                                    Usuário: {item.user.name}
                                </Text>
                                <Text style={styles.emphasizedText}>
                                    Identificador: {identifierText}
                                </Text>
                                <Text style={styles.emphasizedText}>
                                    Origem: {item.certificate.origem}
                                </Text>
                                <Text style={styles.emphasizedText}>
                                    Destino: {item.certificate.destino}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyResultText}>
                            Busque por um certificado válido
                        </Text>
                    )}
                </View>
            )}
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
        marginTop: 0,
    },
    menuBar: {
        // Add styling for your menu bar to ensure it's not accidentally pressed
    },
    button: {
        backgroundColor: "#3498db",
        padding: 15,
        borderRadius: 5,
        marginBottom: 20, // Adjust the marginBottom as needed
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
    },
    resultContainer: {
        marginTop: 20, // Adjust the marginTop as needed
    },
    resultItem: {
        marginBottom: 15,
    },
    emphasizedText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3498db",
        marginVertical: 5,
    },
    emptyResultText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    loadingSpinner: {
        marginTop: 20,
    },
})

export default Validation_Check
