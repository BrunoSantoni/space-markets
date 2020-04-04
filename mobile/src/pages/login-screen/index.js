import React, { useState }from 'react'
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import logo from '../../../assets/icon.png'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function loginScreen() {
    const navigation = useNavigation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function loginPress() {
        console.log(username, password)
    }

    function navigateToRegister() {
        navigation.navigate('Register')
    }

    return (
        <View style={styles.container}>
            
            <Image source={logo} />

            <View style={styles.loginContainer}>  
                <TextInput 
                    value={username} 
                    onChangeText={email => setUsername(email)} 
                    placeholder="Insira seu E-mail" 
                    style={styles.loginInput}
                    placeholderTextColor='#7E7E7E' 
                />
                <TextInput 
                    value={password} 
                    onChangeText={password => setPassword(password)} 
                    placeholder="Insira sua senha" 
                    secureTextEntry={true} 
                    style={styles.loginInput}
                    placeholderTextColor='#7E7E7E' 
                />
                
                <TouchableOpacity style={styles.buttonIniciar} onPress={loginPress}>
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