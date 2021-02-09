import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  AsyncStorage,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import background from "../../../assets/img/background.jpg";
import logo from "../../../assets/img/logo.png";
import api from "../../services/api";
import styles from "./styles";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function loginPress() {
    AsyncStorage.removeItem("user_id");
    AsyncStorage.removeItem("user_mail");

    api
      .post("userlogin", { mail, password })
      .then((res) => {
        const user = res.data._id;

        AsyncStorage.setItem("user_id", user);
        AsyncStorage.setItem("user_mail", mail);

        navigation.navigate("Home");
      })
      .catch(() => {
        alert("E-mail ou senha incorretos!");
      });
  }

  function navigateToRegister() {
    navigation.navigate("Register");
  }

  return (
    <>
      <ImageBackground source={background} style={styles.background} />

      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Image source={logo} style={styles.logo} />

        <View style={styles.loginContainer}>
          <View style={styles.inputSection}>
            <FontAwesome5
              name="at"
              size={20}
              color="#FFF"
              style={styles.inputIcon}
            />
            <TextInput
              value={mail}
              onChangeText={(email) => setMail(email)}
              placeholder="astronauta@meuemail.com"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          <View style={styles.inputSection}>
            <FontAwesome5
              name="key"
              size={20}
              color="#FFF"
              style={styles.inputIcon}
            />
            <TextInput
              value={password}
              onChangeText={(password) => setPassword(password)}
              placeholder="Senha"
              placeholderTextColor="#A9A9A9"
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.inputRightIcon}
            >
              {showPassword ? (
                <FontAwesome5 name="eye-slash" size={20} color="#FFF" />
              ) : (
                <FontAwesome5 name="eye" size={20} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={loginPress}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerSection}
            onPress={navigateToRegister}
          >
            <FontAwesome5 name="address-card" size={20} color="#FFF" />
            <Text style={styles.registerLink}>Não possuo cadastro</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
