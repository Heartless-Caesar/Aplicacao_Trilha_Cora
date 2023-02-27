import React, { useState } from "react";
import { View, Text, Button, Modal } from "react-native";

const CustomModal = (props) => {
  return (
    <Modal animationType="none" visible={props.makeVisible} style={{
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }}>
      <View>
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
