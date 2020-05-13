import React, { useState, useEffect } from 'react'
import {
    Alert,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native'

import TxtInput from '../../components/TxtInput'
import Txt from '../../components/Txt'
import TouchButton from '../../components/TouchButton'

import { useNavigation } from '@react-navigation/native'

import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'

import api from '../../services/api'

import styles from './styles'


export default function SuggestScreen({ route }) {
    const { marketId } = route.params
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [picture, setPicture] = useState(null)

    const navigator = useNavigation()

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
          if (status !== 'granted') {
            alert('Desculpe, você precisa permitir o acesso para continuar!')
          }
        }
    }

    useEffect(() => {
        getPermissionAsync()
    }, [])

    const handleImg = async () => {
        try {
          let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
          })
          if (!res.cancelled) {
            setPicture(res)
          }
        } catch (err) {
          alert(err)
        }
    }

    const handleSuggest = async () => {
        const data = new FormData()

        data.append('suggest_name', product)
        data.append('suggest_description', description)
        data.append('suggest_price', price)
        data.append('suggest_picture', `data:image/jpeg;base64,${picture.base64}`)

        try {
            await api.post('sugestao', data, {
                headers: {
                    auth: marketId
                }
            })

            Alert.alert('Seu produto foi salvo e será enviado para análise! Obrigado por contribuir :)')
            setTimeout(() => navigator.goBack() , 1000)
        } catch(err) {
            Alert.alert(err)
        }
    }

    return(
        <View style={styles.container}>
            <Text>Deixe a sugestão de um produto que você não encontrou!</Text>
            <TxtInput
                value={product} 
                onChangeText={product => setProduct(product)} 
                placeholder="Nome do produto"
                style={styles.formInput}
            />
            <TxtInput
                value={description} 
                onChangeText={description => setDescription(description)} 
                placeholder="Descrição"
                multiline={true}
                style={styles.descriptionInput}
            />
            <TxtInput
                value={price} 
                onChangeText={price => setPrice(price)} 
                placeholder="Preço"
                style={styles.formInput}
            />
            <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10}}>
                {picture ? 
                    <Image source={{ uri: picture.uri }} style={styles.img} onPress={handleImg}/> : 
                    <TouchButton title="Selecione uma imagem" onPress={handleImg} style={styles.selectImg}>
                        <Txt style={{color: '#fff'}}>Envie uma foto do produto</Txt>
                    </TouchButton>
                }
            </View>
            <TouchableOpacity style={styles.btnEnviar} onPress={handleSuggest}>
                <Text style={styles.btnEnviarText}>Enviar sugestão</Text>
            </TouchableOpacity>
        </View>
    )
}
