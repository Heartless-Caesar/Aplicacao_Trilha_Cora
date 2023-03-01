import React, { useState } from "react";
import { View, Text, Button, Modal } from "react-native";
import CustomModalStyle from "../styles/custom_modal_styles";

const CustomModal = (props) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.makeVisible}
    >
      <View style={CustomModalStyle.modal}>
        <Text>Criando caminhada</Text>
        <Button
          title="Fechar"
          onPress={() => {
            props.setMakeVisible(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default CustomModal;
