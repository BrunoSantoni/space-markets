import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native'

import styles from './styles'

import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

export default function MarketProducts({ route }) {
  const navigation = useNavigation()
  const { marketId, marketName, marketPicture, marketLatitude, marketLongitude } = route.params
  const [products, setProducts] = useState([])

  useEffect(() => {
    api
      .get('produtos', {
        headers: {
          auth: marketId,
        },
      })
      .then((res) => {
        setProducts(res.data)
      })
  }, [marketId])

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => <Text style={styles.headerName}>{marketName}</Text>,
      headerRight: () => (
        <Image source={{ uri: marketPicture }} style={styles.headerImg} />
      ),
    })
  }, [products])

  function openExternalDirections() {
    let url =
      'https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=' +
      marketLatitude +
      ', ' +
      marketLongitude
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('Não sei o que fazer com a URL: ' + url)
        } else {
          return Linking.openURL(url)
        }
      })
      .catch((err) => console.error('Um erro ocorreu', err))
  }

  function navigateToSuggest() {
    navigation.navigate('Suggest', {
      marketId: marketId,
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.buttonsText} onPress={navigateToSuggest}>
            Sugerir um produto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.buttonsText} onPress={openExternalDirections}>
            Rota até aqui
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.productContainer}>
        {products.map((product) => (
          <View style={styles.product} key={product._id}>
            <Image
              source={{ uri: product.product_picture_url }}
              style={styles.productImg}
            />
            <View>
              <Text style={styles.productName}>{product.product_name}</Text>
              <View style={styles.priceAndName}>
                <Text style={styles.textPriceAndName}>
                  R$ {product.product_price}
                </Text>
              </View>
              <Text style={styles.productDescription}>
                {product.product_description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
