import React, { useEffect, useState } from 'react'
import { Text, Image, View, AsyncStorage, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'react-native-appearance'

import Color from '../../constants/colors'
import Loading from '../../../assets/img/loading.gif'
import logo from '../../../assets/img/logo.png'
import HomeImage from '../../../assets/img/home-screen-image.png'
import styles from './styles'

import api from '../../services/api'

export default function HomeScreen(props) {
  let colorScheme = useColorScheme()
  const [username, setUsername] = useState('')
  const [id, setId] = useState('')
  const [picture, setPicture] = useState('')
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    getUserEmail()
  }, [id])

  async function getUserEmail() {
    const user = await AsyncStorage.getItem('user_mail')
    const user_id = await AsyncStorage.getItem('user_id')

    api
      .get('usercadastro', {
        headers: {
          auth: user,
        },
      })
      .then((res) => {
        setUsername(res.data.user_name)
        setId(user_id)
        setPicture(res.data.user_profile_picture_url)
        setLoading(false)
      })
  }

  function navigateToProductList() {
    navigation.navigate('ProductList')
  }

  function navigateToMap() {
    navigation.navigate('Map')
  }

  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark'
          ? { backgroundColor: Color.darkBg }
          : { backgroundColor: Color.lightBg },
      ]}
    >
      <View style={styles.titleContainer}>
        <Image source={logo} style={styles.logo} />
        <Image
          source={loading ? Loading : { uri: picture }}
          style={styles.pic}
        />
      </View>

      <Text
        style={[
          { fontSize: 22 },
          colorScheme === 'dark'
            ? { color: Color.darkModeText }
            : { color: Color.lightModeText },
        ]}
      >
        Bem-vindo, {username}!
      </Text>
      <Image source={HomeImage} style={{ width: 300 }} resizeMode="contain" />
      <Text
        style={[
          { fontSize: 18 },
          colorScheme === 'dark'
            ? { color: Color.darkModeText }
            : { color: Color.lightModeText },
        ]}
      >
        O que nós podemos fazer por você hoje?
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          colorScheme === 'dark'
            ? { backgroundColor: Color.darkPrimaryAction }
            : { backgroundColor: Color.lightPrimaryAction },
        ]}
        onPress={navigateToProductList}
      >
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>
          Buscar produtos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          colorScheme === 'dark'
            ? { backgroundColor: Color.darkSecondaryAction }
            : { backgroundColor: Color.lightSecondaryAction },
        ]}
        onPress={navigateToMap}
      >
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>
          Encontrar mercados
        </Text>
      </TouchableOpacity>
    </View>
  )
}
