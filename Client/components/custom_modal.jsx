import React, { useState } from "react";
import { View, Text, Button, Modal } from "react-native";

const CustomModal = ({ makeVisible, setMakeVisible }) => {
  return (
    <Modal animationType="none" visible={makeVisible} style={{}}>
      <View>
        <Text>Criando caminhada</Text>
        <Button
          title="Fechar"
          onPress={() => {
            setMakeVisible(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default CustomModal;
