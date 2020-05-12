import React, { useState } from 'react'
import { Image, Text, View, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native'
import Color from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

import Icons from '@expo/vector-icons/FontAwesome'

import styles from './styles'

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

  function navigateToMarketProducts(marketId, marketName, marketPicture) {
    navigation.navigate('MarketProducts', {
      marketId: marketId,
      marketName: marketName,
      marketPicture: marketPicture,
    })
  }

  const productsList = products.length > 0 ? 
    <FlatList data={products} keyExtractor={(product) => product._id} renderItem = {({item: product, index}) => (
    <TouchableOpacity
      style={styles.placeBtn}
      onPress={() =>
        navigateToMarketProducts(
          product.market_id._id,
          product.market_id.market_name,
          product.market_id.market_picture_url
        )
      }
    >
      <View style={(index % 2) ? styles.even : undefined}>
        <View style={styles.productList}>
          <Image source={{uri: product.product_picture_url}} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={[styles.textProduct, {fontWeight: 'bold'}]}>{product.market_id.market_name}</Text>
            <Text style={[styles.textProduct, {fontSize: 20, fontStyle: 'italic'}]}>{product.product_description}</Text>
            <Text style={styles.textProductPrice}>R${product.product_price}</Text>
          </View>
        </View>
        <View style={styles.location}>
          <Icons name="map-marker" size={25} color={Color.primary} style={[{marginRight: 5}]}/>
          <Text style={[styles.textProduct, {fontSize: 20}]}>2,5km</Text>
        </View>
      </View>
      </TouchableOpacity>
    )}
    /> : <Text>Não há produtos :(</Text>

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
