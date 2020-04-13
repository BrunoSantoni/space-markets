import React, { useEffect, useState } from 'react'

import { Image, View, AsyncStorage, Alert, BackHandler } from 'react-native'
import { useBackHandler } from '@react-native-community/hooks'
import { useNavigation } from '@react-navigation/native'

import Screen from '../../components/Screen'
import Txt from '../../components/Txt'
import Steward from '../../../assets/img/steward.png'
import Loading from '../../../assets/img/loading.gif'
import styles from './styles'
import TouchButton from '../../components/TouchButton'

import api from '../../services/api'

export default function HomeScreen(props){
    const [username, setUsername] = useState('')
    const [id, setId] = useState('')
    const [picture, setPicture] = useState('')
    const [loading, setLoading] = useState(true)

    // const [next, setNext] = useState(1)
    const navigation = useNavigation()

    const backAction = () => {
        Alert.alert("Aviso", "Tem certeza que quer sair?", [
          {
            text: "Não",
            onPress: () => null,
            style: 'default'
          },
          { text: "Sim", onPress: () => navigation.goBack() }
        ])
        return true;
      }

    //BOTA TUDO DENTRO DO ASYNC SENÃO NÃO ESPERA
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction)
        async function getUserEmail() {
            const user = await AsyncStorage.getItem('user_mail')
            const user_id = await AsyncStorage.getItem('user_id')

            api.get('usercadastro', {
                headers: {
                    auth: user
                }
            }).then(res => {
                setUsername(res.data.user_name)
                setId(user_id)
                setPicture(res.data.user_profile_picture_url)
                setLoading(false)
            })
        }
        getUserEmail()
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction)
    }, [id])

    function navigateToProductList(){
        navigation.navigate('ProductList')
        //setNext(0) <- Não sei o que faz e deu erro
    }

    function navigateToMap() {
        navigation.navigate('Map')
    }
    
    return (
        <Screen>
            <View style={styles.stewardContainer}>
                <Image source={loading ? Loading : {uri: picture}} style={styles.img} />
                <Txt style={{fontSize: 20}}>Olá, {username}</Txt>
                <Txt style={{fontSize: 20}}>O que posso fazer por você hoje?</Txt>
            </View>

            <View style={styles.optionContainer}>
                <TouchButton style={styles.firstOption} textStyle={styles.optionText} onPress={navigateToProductList}>
                    Encontre a melhor oferta
                </TouchButton>
                <TouchButton style={styles.secondOption} textStyle={styles.optionText} onPress={navigateToMap}>
                    Encontre um comércio ou produto próximo
                </TouchButton>
            </View>
        </Screen>
    )
}   
