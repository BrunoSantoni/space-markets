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
    const [next, setNext] = useState(1)

    const navigation = useNavigation()

    const [content, setContent] = useState(
        <Screen>
            <View style={styles.stewardContainer}>
                <Image source={loading ? Loading : {uri: picture}} style={styles.img} />
                <Txt style={{fontSize: 20}}>Olá, {username}</Txt>
                <Txt style={{fontSize: 20}}>O que posso fazer por você hoje?</Txt>
            </View>

            <View style={styles.optionContainer}>
                <TouchButton style={styles.firstOption} textStyle={styles.optionText}>Encontre a melhor oferta</TouchButton>
                <TouchButton style={styles.secondOption} textStyle={styles.optionText}>Encontre um comércio ou produto próximo</TouchButton>
            </View>
        </Screen>
    )
    

    //BOTA TUDO DENTRO DO ASYNC SENÃO NÃO ESPERA
    useEffect(() => {
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
    }, [id])

    function navigateToProductList(){
        navigation.navigate('ProductList')
        setNext(0)
    }

    useBackHandler(() => {
        if(next === 2){
            setContent(
            <Screen>
                <View style={styles.stewardContainer}>
                    <Image source={loading ? Loading : {uri: picture}} style={styles.img} />
                    <Txt style={{fontSize: 20}}>Olá, {username}</Txt>
                    <Txt style={{fontSize: 20}}>O que posso fazer por você hoje?</Txt>
                </View>

                <View style={styles.optionContainer}>
                    <TouchButton style={styles.firstOption} textStyle={styles.optionText}>Encontre a melhor oferta</TouchButton>
                    <TouchButton style={styles.secondOption} textStyle={styles.optionText}>Encontre um comércio ou produto próximo</TouchButton>
                </View>
            </Screen>
            )

            setNext(1)
            return true
        } else if(next === 1){
            Alert.alert('SAIR', 'Tem certeza que quer sair?',[
            {   
                text: 'sim', 
                onPress: () => {
                    BackHandler.exitApp()
                },
                style: 'default'
            },

            {
                text: 'não',
                onPress: () => {},
                style: 'default'
            }
            ])
        return true
        }
        // setNext(2)
        // return false
    })

    function optOneHandler(){
        setContent(
            <Screen>
                <View style={styles.stewardContainer}>
                    <Image source={loading ? Loading : {uri: picture}} style={styles.img} />
                    <Txt style={{fontSize: 20}}>Certo,</Txt>
                    <Txt style={{fontSize: 20}}>me informe o nome do produto:</Txt>
                </View>

                <View style={styles.inputContainer}>
                    <TxtInput placeholder="> Insira aqui..." style={{ height: 50 }} />
                    <TxtInput placeholder="> Insira aqui..." style={{ height: 50 }} onSubmitEditing={() => navigateToProductList()} />
                </View>
            </Screen>
        )
        setNext(2)
    }

    function optTwoHandler() {
        setContent(
            <Screen>
                <View style={styles.stewardContainer}>
                    <Image source={loading ? Loading : {uri: picture}} style={styles.img} />
                    <Txt style={{fontSize: 20}}>Certo,</Txt>
                    <Txt style={{fontSize: 20}}>me informe o nome do supermercado:</Txt>
                </View>
                <View style={styles.inputContainer2}>
                    <TxtInput placeholder="> Insira aqui..." style={{ height: 50 }} />
                </View>
            </Screen>
        )
        setNext(2)
    }

    return content
}   