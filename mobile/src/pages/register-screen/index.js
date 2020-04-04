import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import styles from './styles'

export default function RegisterScreen() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')

    

    function submit() {
        if(senha === confirmSenha){
            console.log(nome, email, cpf, senha, confirmSenha)
        }else{
            Alert.alert('Ops',"Senhas não conferem")
        }
    }

    return(
            <View style={styles.container}>
                <View style={styles.registerContainer}>
                    <TextInput
                        value={nome} 
                        onChangeText={texto => setNome(texto)}
                        placeholder='Qual é seu nome?'
                        placeholderTextColor='#7E7E7E'
                        style={styles.registerInput}
                    />

                    <TextInput 
                        value={email}
                        onChangeText={texto => setEmail(texto)}
                        placeholder='Qual é seu melhor E-mail?'
                        placeholderTextColor='#7E7E7E'
                        style={styles.registerInput}
                    />
                    
                    <TextInput 
                        value={cpf}
                        onChangeText={texto => setCpf(texto)}
                        placeholder='Qual é seu CPF?'
                        placeholderTextColor='#7E7E7E'
                        style={styles.registerInput}
                    />

                    <TextInput 
                        value={senha}
                        onChangeText={texto => setSenha(texto)}
                        placeholder='Crie uma senha infálivel!'
                        placeholderTextColor='#7E7E7E'
                        secureTextEntry={true}
                        style={styles.registerInput}
                    />

                    <TextInput 
                        value={confirmSenha}
                        onChangeText={texto => setConfirmSenha(texto)}
                        placeholder='Confirme a senha por favor'
                        placeholderTextColor='#7E7E7E'
                        secureTextEntry={true}
                        style={styles.registerInput}
                    />


                    <TouchableOpacity style={styles.registerInputButton} onPress={submit}>
                        <Text style={styles.registerInputButtonText}>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}