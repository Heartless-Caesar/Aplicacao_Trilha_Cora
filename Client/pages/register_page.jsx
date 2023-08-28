import { View, Image, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import loginStyle from "../styles/login_style";
import Logo from "../assets/caminho-de-cora-black.png";
import CustomInput from "../components/customInput";
import CustomButton from "../components/custom_button";
import toast from "react-native-simple-toast";
import axios from "axios";

const Register_screen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { height } = useWindowDimensions();

  const onRegisterPress = async () => {
    // if (password !== checkPassword) {
    //   toast.show("As senhas não são iguais", toast.LONG, toast.TOP);
    //   return;
    // }

    // try {
    //   const response = await axios.post(
    //     "http://10.0.2.2:5000/Register",
    //     {
    //       username: username,
    //       password: password,
    //       email: email,
    //     },
    //     {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   );

    //   if (response.status === 201) {
    //     console.log("Registration successful:", response.data);
    //     toast.show("Cadastrado com sucesso", toast.LONG, toast.TOP);
    //   } else {
    //     console.log("Unexpected response:", response.status);
    //     toast.show(
    //       "Não foi possível realizar o cadastro",
    //       toast.LONG,
    //       toast.TOP
    //     );
    //   }
    // } catch (error) {
    //   console.log("Error:", error.message);
    //   toast.show("Não foi possível realizar o cadastro", toast.LONG, toast.TOP);
    // }

    navigation.navigate("Home");
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

      <CustomInput
        placeholder="Email"
        value={email}
        setValue={setEmail}
        secureTextEntry={false}
      />

      <CustomButton onPress={onRegisterPress} text="Register" />
      <CustomButton
        onPress={() => navigation.navigate("Login")}
        text="Página de login"
      />
    </View>
  );
};

export default Register_screen;
