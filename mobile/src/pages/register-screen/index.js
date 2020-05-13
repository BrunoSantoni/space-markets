import React, { useState, useEffect } from 'react'
import { Alert, View, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import { Feather } from '@expo/vector-icons'
import Lottie from 'lottie-react-native'

import success from '../../../assets/animations/success.json'
import error from '../../../assets/animations/error.json'
import styles from './styles'
import InputMask from '../../utils/inputMask'
import Screen from '../../components/Screen'
import FixView from '../../components/FixView'
import TxtInput from '../../components/TxtInput'
import TouchButton from '../../components/TouchButton'
import Txt from '../../components/Txt'
import RegisterImage from '../../../assets/register-screen-image.png'

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
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
          if (status !== 'granted') {
            alert('Desculpe, você precisa permitir o acesso para continuar!')
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
    }

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
            } catch(err) {
                Alert.alert(err)
            }
            setSubmit(true)
            setTimeout(() => navigation.navigate('Login') , 1000)
        } else{
            Alert.alert('Ops','Senhas não conferem')
        }
    }

    if(!submit){
        return (
            <Screen style={{ alignItems: 'center' }}>
                <Txt style={styles.titleScreen}>
                    Realize seu cadastro!
                </Txt>    
                <Image source={RegisterImage} resizeMode="contain" style={{width: 250, height: 200}}/>
                <FixView style={styles.registerContainer} >
                    <Txt style={styles.label}>
                        Nome
                    </Txt>
                    <TxtInput
                        value={nome} 
                        onChangeText={texto => setNome(texto)}
                        placeholder='Qual é seu nome?'
                        style={styles.registerInput}
                    />
    
                    <Txt style={styles.label}>
                        Endereço de e-mail
                    </Txt>
                    <TxtInput 
                        value={email}
                        onChangeText={texto => setEmail(texto)}
                        placeholder='Qual é seu melhor e-mail?'
                        keyboardType='email-address'
                        style={styles.registerInput}
                    />
                    
                    <Txt style={styles.label}>
                        CPF
                    </Txt>
                    <TxtInput 
                        value={cpf}
                        onChangeText={texto => {setCpf(InputMask.cpf(texto))}}
                        placeholder='Qual é seu CPF?'
                        keyboardType='numeric'
                        maxLength={14}
                        style={styles.registerInput}
                    />
    
                    <Txt style={styles.label}>
                        Senha
                    </Txt>
                    <TxtInput 
                        value={senha}
                        onChangeText={texto => setSenha(texto)}
                        placeholder='Crie uma senha infalível!'
                        secureTextEntry={true}
                        style={styles.registerInput}
                    />

                    <Txt style={styles.label}>
                        Confirme sua senha
                    </Txt>
                    <TxtInput 
                        value={confirmSenha}
                        onChangeText={texto => setConfirmSenha(texto)}
                        placeholder='Confirme a senha por favor'
                        secureTextEntry={true}
                        style={styles.registerInput}
                    />

                    <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10}}>
                        {foto ? 
                            <Image source={{ uri: foto.uri }} style={styles.img} onPress={handleImg}/> : 
                            <TouchButton title="Selecione uma imagem" onPress={handleImg} style={styles.selectImg}>
                                <Txt style={styles.textStyle}>Adicione uma foto de perfil bem daora!</Txt>
                            </TouchButton>
                        }
                        <TouchButton onPress={handleRegister} style={styles.registerInputButton}>
                            <Feather name='arrow-right' size={18} color='#FFF' />
                        </TouchButton>
                    </View>
                </FixView>

            </Screen>
        )
    }else if(submit){
        return(
            <Screen>
                <Lottie source={success} autoPlay />
            </Screen>
        )
    }else{
        return(
            <Screen>
               <Lottie source={error} autoPlay />
            </Screen>
        )
    }
}