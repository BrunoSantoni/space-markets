import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import background from '../../../assets/img/background.jpg'
import logo from '../../../assets/img/logo.png'
import styles from './styles'

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
    } catch (err) {
      alert('E-mail ou senha incorretos!')
    }
  }

  function navigateToRegister() {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <Image source={background} style={styles.background} />
      <Image source={logo} style={styles.logo} />

      <View style={styles.loginContainer}>
        <View style={styles.inputSection}>
          <FontAwesome5
            name="at"
            size={20}
            color="#FFF"
            style={styles.inputIcon}
          />
          <TextInput
            value={mail}
            onChangeText={(email) => setMail(email)}
            placeholder="astronauta@meuemail.com"
            placeholderTextColor='#A9A9A9'
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputSection}>
          <FontAwesome5
            name="key"
            size={20}
            color="#FFF"
            style={styles.inputIcon}
          />
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder="Senha"
            placeholderTextColor='#A9A9A9'
            secureTextEntry={true}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={loginPress}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerSection}
          onPress={navigateToRegister}
        >
          <FontAwesome5 name="address-card" size={20} color="#FFF" />
          <Text style={styles.registerLink}>Não possuo cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
