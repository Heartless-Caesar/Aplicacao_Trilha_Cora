import * as React from 'react';
import { View } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import { FontAwesome } from "react-native-vector-icons";
import { useNavigation } from '@react-navigation/native';

const CustomMenu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const navigation = useNavigation();

  return (
    <Provider>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<FontAwesome onPress={openMenu} name="user-circle" size={24} color="white" />}>
          <Menu.Item onPress={() => { }} title="Perfil" />
          <Menu.Item onPress={() => navigation.navigate("Login")} title="Sair" />
        </Menu>
      </View>
    </Provider>
  );
};

export default CustomMenu;