import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

const CustomModal = () => {

    const [visible, setVisible] = useState(true);

    return (
        <View>
            <Modal
                animationType="none"
                visible={visible}
                style={
                    {}
                }
            >
                <View>
                    <Text>Criando caminhada</Text>
                    <Button
                        title="Fechar"
                        onPress={() => { setVisible(false) }}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default CustomModal;