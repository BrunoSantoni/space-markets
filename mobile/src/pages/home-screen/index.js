import React, { useEffect } from 'react'
import { Image, View, AsyncStorage } from 'react-native'

import Screen from '../../components/Screen'
import Txt from '../../components/Txt'
import Steward from '../../../assets/img/steward.png'
import styles from './styles'
import TouchButton from '../../components/TouchButton'

import api from '../../services/api'

export default function HomeScreen(props){  
    

    useEffect(() => {
        async function getUserId() {
            try {
                await AsyncStorage.getItem('user_mail')               
            } catch(err) {
                alert(err)
            } 
        }
        const user = getUserId()
        console.log("de baixo" + user)
        api.get('usercadastro', {
            headers: {
                auth: user
            }
        }).then(res => {
            //console.log(res.data)
        })
    }, [])

    return(
        <Screen>
            <View style={styles.stewardContainer}>
                <Image source={Steward} style={styles.img} />
                <Txt style={{fontSize: 20}}>Olá [nome do usuario]</Txt>
                <Txt style={{fontSize: 20}}>O que posso fazer por você hoje?</Txt>
            </View>

            <View style={styles.optionContainer}>
                <TouchButton style={styles.firstOption} textStyle={styles.optionText}>Encontre a melhor oferta</TouchButton>
                <TouchButton style={styles.secondOption} textStyle={styles.optionText}>Encontre um comércio ou produto próximo</TouchButton>
            </View>
        </Screen>
    )
}   