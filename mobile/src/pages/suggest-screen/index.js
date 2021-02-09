import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import background from "../../../assets/img/background.jpg";
import api from "../../services/api";
import styles from "./styles";

export default function SuggestScreen({ route }) {
  const navigation = useNavigation();
  const { marketId, marketName } = route.params;
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState(null);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Desculpe, você precisa permitir o acesso para continuar!");
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.headerName}>Sugerir: {marketName}</Text>
      ),
    });
  }, []);

  const handleImg = async () => {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!res.cancelled) {
        setPicture(res);
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleSuggest = async () => {
    const data = new FormData();

    data.append("suggest_name", product);
    data.append("suggest_description", description);
    data.append("suggest_price", price);
    data.append("suggest_picture", `data:image/jpeg;base64,${picture.base64}`);

    try {
      await api.post("sugestao", data, {
        headers: {
          auth: marketId,
        },
      });

      Alert.alert(
        "Seu produto foi salvo e será enviado para análise! Obrigado por contribuir :)"
      );
      setTimeout(() => navigation.goBack(), 1000);
    } catch (err) {
      Alert.alert(err);
    }
  };

  return (
    <>
      <ImageBackground source={background} style={styles.background} />

      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.tip}>
          Suas sugestões de produtos que forem aprovadas lhe garantirão
          benefícios! *(EM BREVE)
        </Text>
        {picture ? (
          <Image
            source={{ uri: picture.uri }}
            style={styles.pic}
            onPress={handleImg}
          />
        ) : (
          <TouchableOpacity
            title="Selecione uma imagem"
            onPress={handleImg}
            style={styles.selectPic}
          >
            <FontAwesome5
              name={"shopping-basket"}
              size={40}
              color={"#171D24"}
            />
            <Text style={styles.textStyle}>Foto do produto</Text>
          </TouchableOpacity>
        )}
        <View style={styles.inputSection}>
          <FontAwesome5
            name="shopping-basket"
            size={20}
            color="#FFF"
            style={styles.inputIcon}
          />
          <TextInput
            value={product}
            onChangeText={(product) => setProduct(product)}
            placeholder="Produto"
            placeholderTextColor="#A9A9A9"
            style={styles.input}
          />
        </View>
        <View style={styles.inputSection}>
          <FontAwesome5
            name="tag"
            size={20}
            color="#FFF"
            style={styles.inputIcon}
          />
          <TextInput
            value={description}
            onChangeText={(description) => setDescription(description)}
            placeholder="Descrição do produto"
            placeholderTextColor="#A9A9A9"
            multiline={true}
            style={styles.input}
          />
        </View>
        <View style={styles.inputSection}>
          <FontAwesome5
            name="credit-card"
            size={20}
            color="#FFF"
            style={styles.inputIcon}
          />
          <TextInput
            value={price}
            onChangeText={(price) => setPrice(price)}
            placeholder="Preço"
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={handleSuggest} style={styles.confirmButton}>
          <FontAwesome5 name="arrow-right" size={18} color="#FFF" />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </>
  );
}
