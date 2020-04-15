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

    const FadeImage = props => {
        const [fadeAnim] = useState(new Animated.Value(0))
        const [positionTop] = useState(new Animated.Value(50))
        const [positionLeft] = useState(new Animated.Value(0))
        const [heightAnim] = useState(new Animated.Value(200))
        const [widthAnim] = useState(new Animated.Value(200))
      
        useEffect(() => {
            Animated.sequence([
                Animated.timing(
                    fadeAnim,
                    {
                      toValue: 1,
                      duration: 2000,
                    },
                ),
                Animated.parallel([
                    Animated.timing(
                        positionTop,
                        {
                          toValue: -30,
                          duration: 500,
                        }
                    ),
                    Animated.timing(
                        positionLeft,
                        {
                            toValue: -100,
                            duration: 500,
                        }
                    ),
                    Animated.timing(
                        heightAnim,
                        {
                            toValue: 120
                        }
                    ),
                    Animated.timing(
                        widthAnim,
                        {
                            toValue: 120
                        }
                    )
                ]) 
            ]).start()
        }, [])
      
        return (
            <Animated.Image
                source={props.source}
                style={{ ...props.style, opacity: fadeAnim, top: positionTop, left: positionLeft, height: heightAnim, width: widthAnim }}
            >
            </Animated.Image>
            )
      }

    return (
        <Screen style={{justifyContent: 'flex-start'}}>
            
            <FadeImage source={logo}/>

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