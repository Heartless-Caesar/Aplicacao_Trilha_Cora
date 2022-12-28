import { View, Image, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import loginStyle from "../styles/login_style";
import Logo from "../assets/caminho-de-cora-black.png";
import CustomInput from "../components/customInput";
import CustomButton from "../components/custom_button";
import toast from "react-native-simple-toast";
import axios from "axios";

const Register_screen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { height } = useWindowDimensions();

  const onRegisterPress = async () => {
    if (password != checkPassword) {
      toast.show("As senhas não são iguais", toast.LONG, toast.TOP);
      return;
    }

    await axios({
      url: "http://localhost:3000/Register",
      method: "POST",
      data: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        console.log(res.data);
        toast.show("Cadastrado com sucesso", toast.LONG, toast.TOP);
      })
      .catch((err) => {
        console.log(err);
        toast.show(
          "Não foi possível realizar o cadastro",
          toast.LONG,
          toast.TOP
        );
      });
  };

  return (
    <View style={loginStyle.container}>
      <Image
        source={Logo}
        style={[loginStyle.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomInput
        placeholder="Confirm password"
        value={checkPassword}
        setValue={setCheckPassword}
        secureTextEntry={true}
      />
      <CustomButton onPress={onRegisterPress} text="Register" />
    </View>
  );
};

export default Register_screen;
