import React, { useEffect, useState } from 'react'
import { Image, View, AsyncStorage } from 'react-native'

import Screen from '../../components/Screen'
import Txt from '../../components/Txt'
import Steward from '../../../assets/img/steward.png'
import styles from './styles'
import TouchButton from '../../components/TouchButton'

import api from '../../services/api'

export default function HomeScreen(props){
    const [username, setUsername] = useState('')
    const [id, setId] = useState('')

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
            })
        }
        getUserEmail()
    }, [id])

    return(
        <Screen>
            <View style={styles.stewardContainer}>
                <Image source={require(`../../tmp/uploads/teste.png`) /* require(`../../../../backend/tmp/uploads/user/${id}.png`)*/} style={styles.img} />
                <Txt style={{fontSize: 20}}>Olá, {username}</Txt>
                <Txt style={{fontSize: 20}}>O que posso fazer por você hoje?</Txt>
            </View>

            <View style={styles.optionContainer}>
                <TouchButton style={styles.firstOption} textStyle={styles.optionText}>Encontre a melhor oferta</TouchButton>
                <TouchButton style={styles.secondOption} textStyle={styles.optionText}>Encontre um comércio ou produto próximo</TouchButton>
            </View>
        </Screen>
    )
}   