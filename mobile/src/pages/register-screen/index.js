import React, { useState, useEffect } from 'react'
import { Alert, View, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'

import styles from './styles'
import InputMask from '../../utils/inputMask'
import Screen from '../../components/Screen'
import FixView from '../../components/FixView'
import TxtInput from '../../components/TxtInput'
import TouchButton from '../../components/TouchButton'
import Txt from '../../components/Txt'

import api from '../../services/api'


export default function RegisterScreen() {
    const navigation = useNavigation()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')
    const [foto, setFoto] = useState(null)
    const [submit, setSubmit] = useState(false) 

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    }

    useEffect(() => {
        getPermissionAsync()
    }, [])

    const handleImg = async () => {
        try {
          let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
          })
          if (!res.cancelled) {
            setFoto(res)
          }
        } catch (E) {
          alert(E)
        }
      };

    async function handleRegister() {
        if(senha === confirmSenha){
            const data = new FormData()

            data.append('user_name', nome)
            data.append('user_mail', email)
            data.append('user_cpf', cpf)
            data.append('user_password', senha)
            data.append('user_picture', `data:image/jpeg;base64,${foto.base64}`)
    
            try {
                await api.post('usercadastro', data)
                Alert.alert('Usuário cadastrado com sucesso!')
            } catch(err) {
                Alert.alert(err)
            }
            setSubmit(true)
            setTimeout(() => navigation.navigate('Home') , 3000)
        } else{
            Alert.alert('Ops','Senhas não conferem')
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
                        style={styles.registerInputNome}
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
                        placeholder='Crie uma senha infalível!'
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

                    <TouchButton title="Selecione uma imagem" onPress={handleImg} style={styles.selectImg}>
                        <Txt style={styles.textStyle}>Adicione uma foto de perfil bem daora!</Txt>
                    </TouchButton>
                    {foto && <Image source={{ uri: foto.uri }} style={styles.img} />}
    
                    <TouchButton onPress={handleRegister} style={styles.registerInputButton}>REGISTRAR</TouchButton>
    
                </FixView>
            </Screen>
        )
    }else if(submit){
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