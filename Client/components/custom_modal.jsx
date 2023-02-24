import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

const CustomModal = ({ viewModal, setFazerVisivel }) => {
  return (
    <View>
      <Modal animationType="none" visible={viewModal} style={{}}>
        <View>
          <Text>Criando caminhada</Text>
          <Button
            title="Fechar"
            onPress={() => {
              setFazerVisivel(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;
