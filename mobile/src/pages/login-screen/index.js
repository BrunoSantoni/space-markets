import React, { useState, useEffect }from 'react'
import { View, Image, TouchableOpacity, AsyncStorage, Animated } from 'react-native'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
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
            
            <View>
                <Image source={logo} style={{ width: 300, height: 100 }}/>
            </View>
            <View style={styles.Container}>
                <View style={styles.inputGroup}>
                    <Txt>Email</Txt>
                <TxtInput 
                    value={mail} 
                    onChangeText={email => setMail(email)} 
                    placeholder="Insira seu e-mail"
                    placeholderTextColor="#FFF" 
                    style={styles.loginInput}
                />
                </View>
                <View style={styles.inputGroup}>
                    <Txt>Senha</Txt>
                <TxtInput 
                    value={password} 
                    onChangeText={password => setPassword(password)} 
                    placeholder="Insira sua senha" 
                    placeholderTextColor="#FFF"
                    secureTextEntry={true} 
                    style={styles.loginInput}
                />
                </View>
                <TouchButton style={styles.buttonIniciar} onPress={loginPress}>
                    Iniciar
                </TouchButton>
                    <TouchableOpacity style={styles.registerLinkContainer} onPress={navigateToRegister} >
                        <Txt style={styles.registerLink}>Não possuo cadastro</Txt>
                    <FontAwesome5 name='rocket' size={18} color='#FFF'/>

                    </TouchableOpacity>
            </View>
        </Screen>
    )
}