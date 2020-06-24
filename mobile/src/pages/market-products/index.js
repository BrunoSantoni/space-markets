import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'

import Color from '../../constants/colors'
import styles from './styles'

import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

export default function MarketProducts({ route }) {
  let colorScheme = useColorScheme()
  const navigation = useNavigation()
  const {
    marketId,
    marketName,
    marketPicture,
    marketLatitude,
    marketLongitude,
  } = route.params
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
  }, [])

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
      marketName: marketName,
    })
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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.buttons,
            colorScheme === 'dark'
              ? { backgroundColor: Color.darkPrimaryAction }
              : { backgroundColor: Color.lightPrimaryAction },
          ]}
          onPress={navigateToSuggest}
        >
          <Text style={{ fontSize: 16, color: 'white' }}>
            Sugerir um produto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttons,
            colorScheme === 'dark'
              ? { backgroundColor: Color.darkSecondaryAction }
              : { backgroundColor: Color.lightSecondaryAction },
          ]}
          onPress={openExternalDirections}
        >
          <Text style={{ fontSize: 16, color: 'white' }}>Rota até aqui</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.productContainer}>
        {products.map((product) => (
          <View
            style={[
              styles.product,
              colorScheme === 'dark'
                ? { backgroundColor: Color.darkCard }
                : { backgroundColor: Color.lightCard },
            ]}
            key={product._id}
          >
            <Image
              source={{ uri: product.product_picture_url }}
              style={styles.productImg}
            />
            <View>
              <Text
                style={[
                  { fontSize: 20, fontWeight: 'bold' },
                  colorScheme === 'dark'
                    ? { color: Color.darkModeText }
                    : { color: Color.lightModeText },
                ]}
              >
                {product.product_name}
              </Text>
              <Text
                style={[
                  { fontSize: 12 },
                  colorScheme === 'dark'
                    ? { color: Color.darkModeSecondaryText }
                    : { color: Color.lightModeSecondaryText },
                ]}
              >
                {product.product_description}
              </Text>
              <Text
                style={[
                  { fontSize: 16 },
                  colorScheme === 'dark'
                    ? { color: Color.darkModeSecondaryText }
                    : { color: Color.lightModeSecondaryText },
                ]}
              >
                R$ {product.product_price}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
