import React from 'react'
import { Image, Text, View } from 'react-native'
import TxtInput from '../../components/TxtInput'
import Color from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

import Icons from '@expo/vector-icons/FontAwesome'

import logo from '../../../assets/icon.png'

import styles from './styles'
import Logo from '../../components/Logo'

export default function ProductListScreen() {
  const navigation = useNavigation()

  function navigateToHome() {
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icons name="arrow-left" size={20} color={Color.thirdy} onPress={navigateToHome}
        style={styles.icon}></Icons>
        <TxtInput
        placeholder="Informe o produto que deseja comparar"
        style={styles.searchInput}></TxtInput>
        <Icons name="search" size={20} color={Color.thirdy} onPress={() => {}}></Icons>
      </View>

      <View style={styles.productList}>
        <Image source={logo} style={styles.productImage}></Image>
        <View style={styles.productInfo}>
          <Text style={[styles.textProduct, {fontWeight: 'bold'}]}>Nome do mercado</Text>
          <Text><Text style={[styles.textProduct, {fontSize: 20}]}>R$0,00 - </Text>
          <Text style={[styles.textProduct, {fontSize: 20, fontStyle: 'italic'}]}>Nome do produto</Text></Text>
          <Text style={[styles.textProduct, {fontSize: 20}]}>Localização: 2,5km</Text>
        </View>
      </View>
    </View>
  )
}
