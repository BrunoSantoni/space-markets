import React, { useState, useEffect }from 'react'
import { View, Image, TouchableOpacity, AsyncStorage, Animated } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


import TxtInput from '../../components/TxtInput'
import TouchButton from '../../components/TouchButton'
import Txt from '../../components/Txt'
import styles from './styles'
import logo from '../../../assets/icon.png'
import Screen from '../../components/Screen'

import api from '../../services/api'

export default function loginScreen() {
    const navigation = useNavigation()
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    async function loginPress() {
        try {
            AsyncStorage.removeItem('user_id')
            AsyncStorage.removeItem('user_mail')
            const res = await api.post('userlogin', { mail, password })
            const user = res.data._id
            
            AsyncStorage.setItem('user_id', user)
            AsyncStorage.setItem('user_mail', mail)
                
      
            navigation.navigate('Home')
        } catch(err) {
            alert('E-mail ou senha incorretos!')
        }
    }

    function navigateToRegister() {
        navigation.navigate('Register')
    }

    return (
        <Screen style={{justifyContent: 'center'}}>
            
            <Image source={logo} style={{ width: 300, height: 150 }}/>

            <View style={styles.Container}>  
                <TxtInput 
                    value={mail} 
                    onChangeText={email => setMail(email)} 
                    placeholder="Insira seu e-mail" 
                    style={styles.loginInput}
                />
                <TxtInput 
                    value={password} 
                    onChangeText={password => setPassword(password)} 
                    placeholder="Insira sua senha" 
                    secureTextEntry={true} 
                    style={styles.loginInput}
                />

                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchButton style={styles.buttonIniciar} onPress={loginPress}>
                        Iniciar
                    </TouchButton>
                    <TouchableOpacity style={styles.registerLinkContainer} onPress={navigateToRegister} >
                        <Feather name='log-in' size={18} color='#000' />
                        <Txt style={styles.registerLink}>Não possuo cadastro</Txt>
                    </TouchableOpacity>
                </View>
            </View>
            
        </Screen>
    )
}