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
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import pdf_styles from "../styles/pdf_screen_styles"
import { useUserContext } from "../utils/userPersistence"
import axios from "axios"

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

    const fetchValidations = async () => {
        try {
            const response = await axios.get(`http://192.168.1.13:5000/fetch`, {
                params: {
                    userId: id,
                },
            })

            if (response.status === 200) {
                setFetchedLocals(response.data.Locals)

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

                console.log(fetchedLocals)
                const locals = Object.keys(fetchedLocals[0]).filter(
                    (property) => allowedProperties.includes(property)
                )

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

                // Now that the pdfList is generated, set it in your state or variable.
                setPdfList(generatedPdfList) // Assuming you have a state variable or some mechanism to store pdfList
                console.log(`PDF List ${generatedPdfList}`)
            } else {
                console.log("Unexpected response:", response.status)
            }
        } catch (error) {
            console.error("Error:", error.message)
        }
    }

    useEffect(() => {
        fetchValidations()
    }, [])

    const handleDownload = async (startLocal, endLocal) => {
        try {
            // Make a POST request to your API to generate the PDF
            const response = await axios.post(
                "http://192.168.1.13:5000/generate-pdf",
                {
                    startLocal: startLocal,
                    endLocal: endLocal,
                }
            )

            if (response.status === 200) {
                // Handle successful response (e.g., display success message)
                console.log("PDF generated successfully:", response.data)
            } else {
                // Handle unexpected response status
                console.log("Unexpected response:", response.status)
            }
        } catch (error) {
            // Handle any errors that occurred during the request
            console.error("Error:", error.message)
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
                <Text style={pdf_styles.menuItem}>Menu Item 2</Text>
                {/* Insert more items in menu */}
            </Animated.View>
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
                                handleDownload(item.startLocal, item.endLocal)
                            }
                        >
                            <Text style={pdf_styles.buttonText}>Download</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default PDFDownloadPage
