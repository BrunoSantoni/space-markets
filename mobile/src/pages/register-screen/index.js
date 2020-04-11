import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import styles from './styles'
import InputMask from '../../utils/inputMask'
import Screen from '../../components/Screen'
import FixView from '../../components/FixView'
import TxtInput from '../../components/TxtInput'
import TouchButton from '../../components/TouchButton'
import Txt from '../../components/Txt'


export default function RegisterScreen() {
    const navigation = useNavigation()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')
    const [submit, setSubmit] = useState(false)



    function register() {
        if(senha === confirmSenha){
            console.log(nome, email, cpf, senha, confirmSenha)
            setSubmit(true)
            setTimeout(() => navigation.navigate('Home') , 3000)
        }else{
            Alert.alert('Ops',"Senhas não conferem")
        }
    }

    if(!submit){
        return (
            <Screen>    
                <FixView style={styles.registerContainer} >
                    <TxtInput
                        value={nome} 
                        onChangeText={texto => setNome(texto)}
                        placeholder='Qual é seu nome?'
                        style={styles.registerInput}
                    />
    
                    <TxtInput 
                        value={email}
                        onChangeText={texto => setEmail(texto)}
                        placeholder='Qual é seu melhor E-mail?'
                        keyboardType='email-address'
                        style={styles.registerInput}
                    />
                    
                    <TxtInput 
                        value={cpf}
                        onChangeText={texto => {setCpf(InputMask.cpf(texto))}}
                        placeholder='Qual é seu CPF?'
                        keyboardType='numeric'
                        maxLength={14}
                        style={styles.registerInput}
                    />
    
                    <TxtInput 
                        value={senha}
                        onChangeText={texto => setSenha(texto)}
                        placeholder='Crie uma senha infálivel!'
                        secureTextEntry={true}
                        style={styles.registerInput}
                    />
    
                    <TxtInput 
                        value={confirmSenha}
                        onChangeText={texto => setConfirmSenha(texto)}
                        placeholder='Confirme a senha por favor'
                        secureTextEntry={true}
                        style={styles.registerInput}
                    />
    
                    <TouchButton onPress={register} style={styles.registerInputButton}>REGISTRAR</TouchButton>
    
                </FixView>
            </Screen>
        )
    }else if(true){
        return(
            <Screen>
                <FixView style={[styles.registerContainer, {backgroundColor: '#6CB85D', justifyContent: 'center'}]}>
                    <Txt style={{fontFamily: 'rubik-medium', color:'#fff', fontSize: 24}}>Sucesso!</Txt>
                    <Txt style={{fontFamily: 'rubik-medium', color:'#fff', fontSize: 24}}>Cadastro Concluído</Txt>
                </FixView>
            </Screen>
        )
    }else{
        return(
            <Screen>
                <FixView style={[styles.registerContainer, {backgroundColor: '#D03F36', justifyContent: 'center'}]}>
                    <Txt style={{fontFamily: 'rubik-medium', color:'#fff', fontSize: 24}}>Ops!</Txt>
                    <Txt style={{fontFamily: 'rubik-medium', color:'#fff', fontSize: 20, textAlign: 'center'}}>Parece que algo deu errado, tente novamente.</Txt>
                </FixView>
            </Screen>
        )
    }
}