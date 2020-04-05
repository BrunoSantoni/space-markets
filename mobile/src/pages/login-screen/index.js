import React, { useState }from 'react'
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import logo from '../../../assets/icon.png'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function loginScreen() {
    const navigation = useNavigation()
    const [user_mail, setUserMail] = useState('')
    const [user_password, setUserPassword] = useState('')

    async function handleLogin() {
        try {
            const response = await api.post('user-login', { user_mail, user_password })

            alert('Acerto')
        } catch(err) {
            alert('Erro')
        }
    }

    function navigateToRegister() {
        navigation.navigate('Register')
    }

    return (
        <View style={styles.container}>
            
            <Image source={logo} />

            <View style={styles.loginContainer}>  
                <TextInput 
                    value={user_mail} 
                    onChangeText={email => setUserMail(email)} 
                    placeholder="Insira seu E-mail" 
                    style={styles.loginInput}
                    placeholderTextColor='#7E7E7E' 
                />
                <TextInput 
                    value={user_password} 
                    onChangeText={password => setUserPassword(password)} 
                    placeholder="Insira sua senha" 
                    secureTextEntry={true} 
                    style={styles.loginInput}
                    placeholderTextColor='#7E7E7E' 
                />
                
                <TouchableOpacity style={styles.buttonIniciar} onPress={handleLogin}>
                    <Text style={styles.buttonInputText}>INICIAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerLinkContainer} onPress={navigateToRegister} >
                    <Text style={styles.registerLink}>Não possuo cadastro</Text>
                    <Feather name='log-in' size={18} color='#fff' />
                </TouchableOpacity>
            </View>
        </View>
    )
}