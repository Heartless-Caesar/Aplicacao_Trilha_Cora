/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Image,
    Pressable,
    FlatList,
    ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import pdf_styles from "../styles/pdf_screen_styles"
import { useUserContext } from "../utils/userPersistence"
import axios from "axios"
import { Permissions, MediaLibrary } from "expo"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { Buffer } from "buffer"

// eslint-disable-next-line react/prop-types
// TODO Diminuir quantidade de itens na tela de certificados
const PDFDownloadPage = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [fetchedLocals, setFetchedLocals] = useState([])
    const { id } = useUserContext()
    const [pdfList, setPdfList] = useState([])
    const localNames = {
        cid_go: "Cidade de Goiás",
        //cocal: "Cocalzinho de Goiás",
        pire: "Pirenópolis",
        frans: "São Francisco de Goiás",
        jara: "Jaraguá",
        ita: "Itaguari",
        corumba: "Corumba",
    }

    function getFileUri(name) {
        return FileSystem.documentDirectory + `${encodeURI(name)}.pdf`
    }

    useEffect(() => {
        fetchValidations()
    }, [])

    const fetchValidations = async () => {
        try {
            const response = await fetchData()
            if (response.status === 200) {
                const fetchedLocals = response.data.Locals
                const allowedProperties = [
                    "cocal",
                    "corumba",
                    "frans",
                    "ita",
                    "itab",
                    "jara",
                    "pire",
                    "cid_go",
                ]

                const locals = filterAllowedProperties(
                    fetchedLocals,
                    allowedProperties
                )

                const generatedPdfList = generatePdfList(locals)
                setPdfList(generatedPdfList)
            } else {
                handleErrorResponse(response.status)
            }
        } catch (error) {
            console.error("An error occurred:", error)
        }
    }

    const fetchData = async () => {
        return await axios.get(`http://${process.env.BASE_URL}/fetch`, {
            params: {
                userId: id,
            },
        })
    }

    const filterAllowedProperties = (fetchedLocals, allowedProperties) => {
        return Object.keys(fetchedLocals[0]).filter((property) =>
            allowedProperties.includes(property)
        )
    }

    const generatePdfList = (locals) => {
        const generatedPdfList = []
        for (let i = 0; i < locals.length; i++) {
            for (let j = i + 1; j < locals.length; j++) {
                generatedPdfList.push({
                    title: `${locals[i]} to ${locals[j]}`,
                    startLocal: locals[i],
                    endLocal: locals[j],
                })
            }
        }
        console.log(`PDF List ${generatedPdfList}`)
        return generatedPdfList
    }

    const handleErrorResponse = (statusCode) => {
        console.log("Unexpected response:", statusCode)
    }

    const handleDownload = async (startLocal, endLocal) => {
        console.log(startLocal + " " + endLocal)
        try {
            // Make a POST request to your API to generate the PDF using Axios
            const response = await axios.get(
                `http://${process.env.BASE_URL}/generate_cert`,
                {
                    params: {
                        inicio: startLocal,
                        destino: endLocal,
                        userId: id,
                    },
                    headers: {
                        "Content-Type": "application/PDF",
                        Accept: "*/*",
                        "Accept-Encoding": "gzip, deflate, br",
                    },
                    responseType: "arraybuffer",
                }
            )

            const buff = Buffer.from(response.data, "base64")

            const pdf = buff.toString("base64")
            const fileUri = getFileUri("Certificado")
            await FileSystem.writeAsStringAsync(fileUri, pdf, {
                encoding: FileSystem.EncodingType.Base64,
            })
            await Sharing.shareAsync(fileUri)
        } catch (error) {
            // Handle any errors that occurred during the request
            console.error("Error:", error.message)
        }
    }

    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        } else {
            console.log("Permission denied to save file to camera roll")
        }
    }

    const menuOpacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(menuOpacity, {
            toValue: showMenu ? 1 : 0,
            duration: 150,
            useNativeDriver: true,
        }).start()
    }, [showMenu])

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const filteredPdfList = pdfList.filter((pdf) => {
        const startName = localNames[pdf.startLocal]
        const endName = localNames[pdf.endLocal]
        return startName && endName
    })

    return (
        <View style={pdf_styles.container}>
            {/* Components Below */}

            {/* Menu */}
            <View style={pdf_styles.floatingRectangle}>
                <TouchableOpacity
                    style={pdf_styles.menuIcon}
                    onPress={toggleMenu}
                >
                    <Ionicons name="menu-outline" size={24} color="black" />
                </TouchableOpacity>
                <Image
                    source={import("../assets/profile-pic.png")}
                    style={pdf_styles.profilePic}
                />
            </View>

            {/* Menu itself */}
            <Animated.View
                style={[pdf_styles.menuContent, { opacity: menuOpacity }]}
            >
                {/* Add your menu items here */}
                <Pressable
                    onPress={() => {
                        // eslint-disable-next-line react/prop-types
                        navigation.replace("Home")
                    }}
                >
                    <Text style={pdf_styles.menuItem}>Home</Text>
                </Pressable>
                <Text style={pdf_styles.menuItem}>Informações turísticas</Text>
                {/* Insert more items in menu */}
            </Animated.View>
            {pdfList && pdfList.length > 0 ? (
                <FlatList
                    data={filteredPdfList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            style={pdf_styles.pdfContainer}
                        >
                            <Text style={pdf_styles.pdfTitle}>
                                Certificado de {localNames[item.startLocal]} a{" "}
                                {localNames[item.endLocal]}
                            </Text>
                            <TouchableOpacity
                                style={pdf_styles.downloadButton}
                                onPress={() =>
                                    handleDownload(
                                        item.startLocal,
                                        item.endLocal
                                    )
                                }
                            >
                                <Text style={pdf_styles.buttonText}>
                                    Download
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
        </View>
    )
}

export default PDFDownloadPage
