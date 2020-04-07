import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import styles from './styles'
import api from '../../services/api'

import { useNavigation } from '@react-navigation/native'

export default function RegisterScreen() {
    const [user_name, setNome] = useState('')
    const [user_mail, setEmail] = useState('')
    const [user_cpf, setCpf] = useState('')
    const [user_password, setSenha] = useState('')
    const [confirm_password, setConfirmSenha] = useState('')

    const navigation = useNavigation()


    async function handleRegister() {

        if(user_password === confirm_password){
        const data = {
            user_name,
            user_mail,
            user_cpf,
            user_password
        }

        try {
            await api.post('usercadastro', data)

            alert('Cadastro realizado com sucesso')

            navigation.navigate('Login')
        } catch(err) {
            alert(err)
        }
      } else {
        Alert.alert('Ops',"Senhas não conferem")
      }
    }

    return(
            <View style={styles.container}>
                <View style={styles.registerContainer}>
                    <TextInput
                        value={user_name} 
                        onChangeText={texto => setNome(texto)}
                        placeholder='Qual é seu nome?'
                        placeholderTextColor='#7E7E7E'
                        style={styles.registerInput}
                    />

                    <TextInput 
                        value={user_mail}
                        onChangeText={texto => setEmail(texto)}
                        placeholder='Qual é seu melhor E-mail?'
                        placeholderTextColor='#7E7E7E'
                        style={styles.registerInput}
                    />
                    
                    <TextInput 
                        value={user_cpf}
                        onChangeText={texto => setCpf(texto)}
                        placeholder='Qual é seu CPF?'
                        placeholderTextColor='#7E7E7E'
                        style={styles.registerInput}
                    />

                    <TextInput 
                        value={user_password}
                        onChangeText={texto => setSenha(texto)}
                        placeholder='Crie uma senha infálivel!'
                        placeholderTextColor='#7E7E7E'
                        secureTextEntry={true}
                        style={styles.registerInput}
                    />

                    <TextInput 
                        value={confirm_password}
                        onChangeText={texto => setConfirmSenha(texto)}
                        placeholder='Confirme a senha por favor'
                        placeholderTextColor='#7E7E7E'
                        secureTextEntry={true}
                        style={styles.registerInput}
                    />


                    <TouchableOpacity style={styles.registerInputButton} onPress={handleRegister}>
                        <Text style={styles.registerInputButtonText}>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}