import React, { useState } from 'react'
import { Image, Text, View, TextInput, Alert } from 'react-native'
import TxtInput from '../../components/TxtInput'
import Color from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

import Icons from '@expo/vector-icons/FontAwesome'

import logo from '../../../assets/icon.png'

import styles from './styles'
import Logo from '../../components/Logo'

import api from '../../services/api'

export default function ProductListScreen() {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])

  async function handleSearch() {
    try {
      await api.get('buscaproduto', {
        headers: {
          search: search
        }
      }).then(res => {
        setProducts(res.data)
      })
    } catch(err) {
      Alert.alert(err)
    }
    
  }

  function navigateToHome() {
    navigation.navigate('Home')
  }

  const productsList = products.length > 0 ? 
    products.map((product, index) => (
      <View style={styles.productList}>
        <Image source={{uri: product.product_picture_url}} style={styles.productImage}></Image>
        <View style={styles.productInfo}>
          <Text style={[styles.textProduct, {fontWeight: 'bold'}]}>{product.market_id.market_name}</Text>
          <Text><Text style={[styles.textProduct, {fontSize: 20}]}>R${product.product_price} - </Text>
          <Text style={[styles.textProduct, {fontSize: 20, fontStyle: 'italic'}]}>{product.product_description}</Text></Text>
          <Text style={[styles.textProduct, {fontSize: 20}]}>Localização: 2,5km</Text>
        </View>
      </View>
    )) : <Text>Não há produtos :(</Text>

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icons name="arrow-left" size={20} color={Color.thirdy} onPress={navigateToHome}
        style={styles.icon}></Icons>
        <TextInput
        placeholder="Informe o produto que deseja comparar"
        style={styles.searchInput}
        value={search}
        onChangeText={event => setSearch(event)}></TextInput>
        <Icons name="search" size={20} color={Color.thirdy}
        onPress={handleSearch}></Icons>
      </View>

      {productsList}
    </View>
  )
}
