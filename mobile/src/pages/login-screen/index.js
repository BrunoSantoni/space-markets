import React, { useState }from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import TxtInput from '../../components/TxtInput'
import TouchButton from '../../components/TouchButton'
import Txt from '../../components/Txt'
import styles from './styles'
import logo from '../../../assets/icon.png'
import Screen from '../../components/Screen'

export default function loginScreen() {
    const navigation = useNavigation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function loginPress() {
        console.log(username, password)
        navigation.navigate('Home')
    }

    function navigateToRegister() {
        navigation.navigate('Register')
    }

    return (
        <Screen>
            
            <Image source={logo} />

            <View style={styles.Container}>  
                <TxtInput 
                    value={username} 
                    onChangeText={email => setUsername(email)} 
                    placeholder="Insira seu E-mail" 
                    style={styles.loginInput}
                />
                <TxtInput 
                    value={password} 
                    onChangeText={password => setPassword(password)} 
                    placeholder="Insira sua senha" 
                    secureTextEntry={true} 
                    style={styles.loginInput}
                />
                
                <TouchButton style={styles.buttonIniciar} onPress={loginPress}>
                    INICIAR
                </TouchButton>

                <TouchableOpacity style={styles.registerLinkContainer} onPress={navigateToRegister} >
                    <Txt style={styles.registerLink}>Não possuo cadastro</Txt>
                    <Feather name='log-in' size={18} color='#fff' />
                </TouchableOpacity>
            </View>
        </Screen>
    )
}